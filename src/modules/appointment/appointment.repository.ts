import { AppDataSource } from "../../config/datasource";
import { Appointment } from "../../entities/appointment.entities";
import { UserRole } from "../../entities/user_role.entities";

export class AppointmentRepository{
   private appointmentRepository = AppDataSource.getRepository(Appointment);
   
   async createAppointment(data: Partial<Appointment>){
      const appointment = this.appointmentRepository.create(data);
      return await this.appointmentRepository.save(appointment);
   }

   async findById(appontmentId: string){
      return await this.appointmentRepository.findOne({
         where: {appointment_id: appontmentId},
         relations: {
            patient: true,
            doctor: true,
            status: true
         }
      });
   };

   async findBtPatientId(patientId: string){
      return await this.appointmentRepository.find({
         where: {
            patient: {patient_id: patientId}
         },
         relations: {
            doctor: true,
            status: true
         },
         order: {
            appointment_date: "ASC",
            appointment_time: "ASC"
         }
      })
   };


   async findByDoctorId(doctorId: string){
      return await this.appointmentRepository.find({
         where: {
            doctor: { doctor_id: doctorId }
         },
         relations: {
            patient: true,
            status: true
         },
         order: {
            appointment_date: "ASC",
            appointment_time: "ASC"
         }
      })
   };

   async isSlotTaken(doctorId: string, appointmentDate: string, appointmentTime: string){
      const count = await this.appointmentRepository.count({
         where: {
            doctor: {doctor_id: doctorId},
            appointment_date: appointmentDate as any,
            appointment_time: appointmentTime
         }
      });

      return count > 0;
   };

   async save(appointment: Appointment){ //kam to update ka hi karti hai...
      return await this.appointmentRepository.save(appointment)
   };

   async deleteAppointment(appointmentId: string){
      return await this.appointmentRepository.softDelete({appointment_id: appointmentId});
   }
}