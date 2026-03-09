import { AppError } from "../../common/errors/AppError";
import { DoctorStatus } from "../../entities/doctor.entities";
import { DayOfWeek, DoctorScheduling } from "../../entities/doctor_scheduling.entities";
import { DoctorRepository } from "../doctor/doctor.repository";
import { SchedulingRepository } from "./doctorScheduling.repository";

export class DoctorSchedulingService {

   private schedulingRepository = new SchedulingRepository();
   private doctorRepository = new DoctorRepository();

   async createSchedule(data: Partial<DoctorScheduling>) {
      
      const doctorId = data.doctor?.doctor_id

      const doctor = await this.doctorRepository.findByDoctorId(String(doctorId));

      if(doctor?.status !== DoctorStatus.ACTIVE){
         throw new AppError("Doctor is not active to create schedule", 401, "DOCTOR_NOT_ACTIVE");
      }

      if (!data.doctor || !data.day_of_week) {
         throw new AppError("Doctor and day_of_week are required", 400, "DOCTOR_AND_DAY_REQUIRED");
      }

      if (!data.start_time || !data.end_time) {
         throw new AppError("Start time and end time are required", 400, "TIME_RANGE_REQUIRED");
      }

      if (data.start_time >= data.end_time) {
         throw new AppError("Start time must be before end time", 400, "INVALID_TIME_RANGE");
      }

      const existingSchedule =
         await this.schedulingRepository.findByDoctorAndDay(
            data.doctor.doctor_id,
            data.day_of_week
         );

      if (existingSchedule) {
         throw new AppError("Schedule already exists for this doctor on this day", 409, "SCHEDULE_ALREADY_EXISTS");
      }

      return await this.schedulingRepository.createSchedul(data);
   }

   async getDoctorSchedule(doctorId: string) {
      return await this.schedulingRepository.findByDoctorId(doctorId);
   }

   async updateSchedule(scheduleId: string, data: Partial<DoctorScheduling>) {

      if (data.start_time && data.end_time) {
         if (data.start_time >= data.end_time) {
            throw new AppError("Start time must be before end time", 400, "INVALID_TIME_RANGE");
         }
      }

      return await this.schedulingRepository.updateSchedule(scheduleId, data);
   }

   async deleteSchedule(scheduleId: string) {
      return await this.schedulingRepository.deleteSchedule(scheduleId);
   }

}