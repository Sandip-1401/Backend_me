import { AppDataSource } from "../../config/datasource";
import { AppointmentStatus, AppointmentStatusName } from "../../entities/appointment_status.entities";
import { Doctor } from "../../entities/doctor.entities";
import { Patient } from "../../entities/patient.entities";
import { UserRole } from "../../entities/user_role.entities";
import { CreateAppointmentDto, UpdateAppointmentDto } from "./appointment.dto";
import { AppointmentRepository } from "./appointment.repository";
import { SchedulingRepository } from "../doctor-scheduling/doctorScheduling.repository";
import { DayOfWeek } from "../../entities/doctor_scheduling.entities";

export class AppointmentService {
   private appointmentRepository = new AppointmentRepository();
   private patientRepository = AppDataSource.getRepository(Patient);
   private doctorRepository = AppDataSource.getRepository(Doctor);
   private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
   private roleRepository = AppDataSource.getRepository(UserRole);
   private schedulingRepository = new SchedulingRepository();

   async createAppointment(userId: string, data: CreateAppointmentDto) {
      const patient = await this.patientRepository.findOne({
         where: { user: { user_id: userId } },
      })
      if (!patient) throw new Error("Patient not found");

      const doctor = await this.doctorRepository.findOne({
         where: { doctor_id: data.doctor_id },
      })

      if (!doctor) throw new Error("Doctor not found");

      const selectdDate = new Date(data.appointment_date);

      const appointmentDay = selectdDate
         .toLocaleDateString("en-US", {weekday: "long"})
         .toUpperCase() as DayOfWeek
         //selected date de uska day nikala...like 2026-03-4 -> WEDNESDAY

      const schedule = await this.schedulingRepository.findByDoctorAndDay(data.doctor_id, appointmentDay);

      if(!schedule){
         throw new Error("Doctor is not available on this day");
      }

      if(
         data.appointment_time < schedule.start_time ||
         data.appointment_time >= schedule.end_time //hmmm...doctor ka timing 9 se 12 ka ho and slot 30-30 minutes ke ho to ham 12 baje sloat start nahi kar sakte...isi liye >= end_time use kiya...
      ){
         throw new Error("Appointment time is outside doctor working hours");
      }
      //ese samjo data.appointment_time -> selected by patient
      //yoo samjo ki doctor ka starting time 9 baje ka hai and patient 8 baje aa gaya to esa nahi chalega....fir doctor ka ending time 12 baje ka hai fir patient 1 baje ata hai...to wo v nahi chalega....done...!!

      const start = schedule.start_time.split(":").map(Number);
      //start time -> 09:00 -> split -> ["09","00"] -> .map() -> ['9','0']
      const appointment = data.appointment_time.split(":").map(Number);
      //same as start time...assume appointment_time 9:30

      const startMinutes = start[0] * 60 + start[1];
      //['9','0'] -> 9 * 60 + 0 = 540 minutes
      const appointmentMinutes = appointment[0] * 60 + appointment[1];
      //['9','30'] -> 9 * 60 + 30 = 570 minutes

      //ab samjo kyu minutes me convert kiya...

      const diff = appointmentMinutes - startMinutes;
      //ab dekho...here comparison in minutes is easier than in hour and in hour there may be mistake...isi liye minutes me convert kiya...

      if (diff % schedule.slot_duration_minutes !== 0) {
         throw new Error("Invalid appointment slot");
      }//diff = 570-540 = 30...we assumind slote_duration 30 minutes...diff % slot_duration_minutes = 30 % 30 = 0....if 0 then valid slot else throw error....like 9:00, 9:30, 10:00 are valid and 9:10, 10:12 are invalid....but according to slot_duration_minutes it can be 60 too...ok...got it...!!

      const today = new Date();

      if (selectdDate <= today) {
         throw new Error("Appointment date must be in future")
      }

      // const isSlotTaken = await this.appointmentRepository.isSlotTaken(
      //    data.doctor_id,
      //    data.appointment_date,
      //    data.appointment_time,
      // )

      // if (isSlotTaken) throw new Error("Slot for your time is already booked")

      const slotCount = await this.appointmentRepository.countAppointmentInSlot(
         data.doctor_id,
         data.appointment_date,
         data.appointment_time
      );

      const maxPatients = schedule.max_patients ?? 1;

      if(slotCount >= maxPatients){
         throw new Error("This appointment slot is full");
      }

      const bookedStatus = await this.appointmentStatusRepository.findOne({
         where: { status_name: AppointmentStatusName.BOOKED }
      });

      if (!bookedStatus) throw new Error("Appointment status is missing")

      return await this.appointmentRepository.createAppointment({
         patient,
         doctor,
         appointment_date: selectdDate,
         appointment_time: data.appointment_time,
         status: bookedStatus,
         reason: data.reason
      })
   };

   async giveAvilableSlots(doctorId: string, date: string){
      const selectedDate = new Date(date);

      const appointmentDay = selectedDate
         .toLocaleDateString("en-US", { weekday: "long" })
         .toUpperCase() as DayOfWeek;

      const schedule = await this.schedulingRepository.findByDoctorAndDay(
         doctorId,
         appointmentDay
      );
      if (!schedule) {
         throw new Error("Doctor is not available on this day");
      }

      const appointments =
      await this.appointmentRepository.countAppointmentsForDoctorAndDate(
         doctorId,
         date
      );

      const [startHour, startMinute] = schedule.start_time.split(":").slice(0,2).map(Number);
      const [endHour, endMinute] = schedule.end_time.split(":").slice(0,2).map(Number);

      let currentMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      const slots: string[] = [];

      while(currentMinutes < endMinutes){
         const hour = Math.floor(currentMinutes/60)
            .toString()
            .padStart(2, "0");
         
         const minutes = (currentMinutes % 60)
            .toString()
            .padStart(2, "0");

         const slotTime = `${hour}:${minutes}`;

         const slotCount = appointments.filter(a => a.appointment_time === slotTime).length;

         const maxPatients = schedule.max_patients ?? 1;

         if(slotCount < maxPatients){
            slots.push(slotTime);
         }

         currentMinutes += schedule.slot_duration_minutes;
      } 

      return slots;
   }

   async updateStatus(appointmentId: string, data: UpdateAppointmentDto, role: string) {
      const appointment = await this.appointmentRepository.findById(appointmentId);

      if (!appointment) throw new Error("Appointment not found");

      if (!data.status) return appointment;

      if (appointment.status.status_name === AppointmentStatusName.COMPLETED) {
         throw new Error("Completed appointment can not modify")
      }

      if (role === "PATIENT" && data.status !== AppointmentStatusName.CANCELLED) {
         throw new Error("Patient can only cancel appointment")
      }

      if (role === "DOCTOR" && data.status !== AppointmentStatusName.COMPLETED) {
         throw new Error("Doctor can only complet appointment")
      }

      const newStatus = await this.appointmentStatusRepository.findOne({
         where: {
            status_name: data.status
         }
      });

      if (!newStatus) throw new Error("Invalid status");

      appointment.status = newStatus;

      return await this.appointmentRepository.save(appointment);
   };

   async getMyAppointments(userId: string) {
      const patient = await this.patientRepository.findOne({
         where: { user: { user_id: userId } },
      });

      if (patient) {
         return await this.appointmentRepository.findBtPatientId(
            patient.patient_id
         );
      }

      const doctor = await this.doctorRepository.findOne({
         where: { user: { user_id: userId } },
      });

      if (doctor) {
         return await this.appointmentRepository.findByDoctorId(
            doctor.doctor_id
         );
      }

      throw new Error("User has no patient or doctor profile");
   };

   async getRoleByUserId(userId: string){
      const roleRow =  await this.roleRepository.findOne({
         where: {user: {user_id: userId}},
         relations: {role: true}
      });
      if (!roleRow) {
         throw new Error("User role not found");
      }

      return roleRow?.role.role_name;
   }
}