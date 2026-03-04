import { DayOfWeek } from "../../../entities/doctor_scheduling.entities";

export interface CreateDoctorScheduleDto {
   doctor_id: string,
   day_of_week: DayOfWeek,
   start_time: string,
   end_time: string,
   slot_duration_minutes: number,
   max_patients?: number
}