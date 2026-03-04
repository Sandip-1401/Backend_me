import { DayOfWeek, DoctorScheduling } from "../../entities/doctor_scheduling.entities";
import { SchedulingRepository } from "./doctorScheduling.repository";

export class DoctorSchedulingService {

   private schedulingRepository = new SchedulingRepository();

   async createSchedule(data: Partial<DoctorScheduling>) {

      if (!data.doctor || !data.day_of_week) {
         throw new Error("Doctor and day_of_week are required");
      }

      if (!data.start_time || !data.end_time) {
         throw new Error("Start time and end time are required");
      }

      if (data.start_time >= data.end_time) {
         throw new Error("Start time must be before end time");
      }

      const existingSchedule =
         await this.schedulingRepository.findByDoctorAndDay(
            data.doctor.doctor_id,
            data.day_of_week
         );

      if (existingSchedule) {
         throw new Error("Schedule already exists for this doctor on this day");
      }

      return await this.schedulingRepository.createSchedul(data);
   }

   async getDoctorSchedule(doctorId: string) {
      return await this.schedulingRepository.findByDoctorId(doctorId);
   }

   async updateSchedule(scheduleId: string, data: Partial<DoctorScheduling>) {

      if (data.start_time && data.end_time) {
         if (data.start_time >= data.end_time) {
            throw new Error("Start time must be before end time");
         }
      }

      return await this.schedulingRepository.updateSchedule(scheduleId, data);
   }

   async deleteSchedule(scheduleId: string) {
      return await this.schedulingRepository.deleteSchedule(scheduleId);
   }

}