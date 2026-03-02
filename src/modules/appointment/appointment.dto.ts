import { AppointmentStatusName } from "../../entities/appointment_status.entities";

export interface CreateAppointmentDto{
   doctor_id: string,
   appointment_date: string,
   appointment_time: string,
   reason: string,
}
 
export interface UpdateAppointmentDto{
   appointment_date: string,
   appointment_time: string,
   reason: string,

   status?: AppointmentStatusName;
   //patien : can CANCELLED
   //doctor : can COMPLETED
}