import { z } from 'zod';

export const createAppointmentSchema = z.object({
  doctor_id: z.string().uuid(),
  appointment_date: z.string(),
  appointment_time: z.string(),
  reason: z.string().min(3),
});

export const updateAppointmentSchema = z.object({
  appointment_date: z.string(),
  appointment_time: z.string(),
  reason: z.string().min(3),
  status: z.string().optional(),
});
