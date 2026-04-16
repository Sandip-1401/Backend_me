import { z } from 'zod';

const prescriptionMedicineSchema = z.object({
  medicine_name: z.string().min(1, "Medicine name is required"),
  frequency: z.string()
    .min(5, "Format must be X-X-X")
    .regex(/^[01]-[01]-[01]$/, "Frequency must be in 1-0-1 format (Morning-Afternoon-Night)"),
  dosage: z.string().min(1, "Dosage is required"),
  duration_days: z.number().min(1, "Duration must be at least 1 day"),
  unit_price: z.number().optional(),
});
export const createPrescriptionSchema = z.object({
  medical_record_id: z.string().uuid(),
  // doctor_id: z.string().uuid(),
  // patient_id: z.string().uuid(),
  notes: z.string().optional(),
  medicines: z.array(prescriptionMedicineSchema).min(1),
});
