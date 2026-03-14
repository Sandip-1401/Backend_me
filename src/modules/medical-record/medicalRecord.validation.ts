import { z } from 'zod';

export const createMedicalRecordSchema = z.object({
  // patient_id: z.string().uuid(),
  // doctor_id: z.string().uuid(),
  appointment_id: z.string().uuid(),
  diagnosis: z.string().min(3),
  notes: z.string().optional(),
});
