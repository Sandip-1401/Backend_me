import { AppDataSource } from "../../config/datasource";
import { AppointmentStatus, AppointmentStatusName } from "../../entities/appointment_status.entities";
import { Doctor } from "../../entities/doctor.entities";
import { Patient } from "../../entities/patient.entities";
import { UserRole } from "../../entities/user_role.entities";
import { CreateAppointmentDto, UpdateAppointmentDto } from "./appointment.dto";
import { AppointmentRepository } from "./appointment.repository";


export class AppointmentService {
   private appointmentRepository = new AppointmentRepository();
   private patientRepository = AppDataSource.getRepository(Patient);
   private doctorRepository = AppDataSource.getRepository(Doctor);
   private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
   private roleRepository = AppDataSource.getRepository(UserRole);

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
      const today = new Date();

      if (selectdDate <= today) {
         throw new Error("Appointment date must be in future")
      }

      const isSlotTaken = await this.appointmentRepository.isSlotTaken(
         data.doctor_id,
         data.appointment_date,
         data.appointment_time,
      )

      if (isSlotTaken) throw new Error("Slot for your time is already booked")

      const bookedStatus = await this.appointmentStatusRepository.findOne({
         where: { status_name: AppointmentStatusName.BOOKED }
      });

      if (!bookedStatus) throw new Error("Appointment status is missing")

         const allDoctors = await this.doctorRepository.find();
         console.log("ALL DOCTORS:", allDoctors);

      return await this.appointmentRepository.createAppointment({
         patient,
         doctor,
         appointment_date: selectdDate,
         appointment_time: data.appointment_time,
         status: bookedStatus,
         reason: data.reason
      })
   };

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