import { z } from "zod";
import { DayOfWeek } from "../../entities/doctor_scheduling.entities";

const timeRegex = /^([01]\d|2[0-3]):([0-5\d])(:[0-5]\d)?$/;

export const createDoctorScheduleSchema = z.object({
  doctor_id: z.string().uuid(),
  day_of_week: z.nativeEnum(DayOfWeek),

  start_time: z.string(),//.regex(timeRegex, "Invalid time format"),
  end_time: z.string(),//.regex(timeRegex, "Invalid time format"),

  slot_duration_minutes: z.number().min(1),

  max_patients: z.number().min(0).optional()
});

export const updateDoctorScheduleSchema = z.object({
  day_of_week: z.nativeEnum(DayOfWeek).optional(),

  start_time: z.string(),//.regex(timeRegex, "Invalid time format"),
  end_time: z.string(),//.regex(timeRegex, "Invalid time format"),

  slot_duration_minutes: z.number().min(1).optional(),

  max_patients: z.number().min(0).optional()
});