import { z } from 'zod';

const prescriptionMedicineSchema = z.object({
  medicine_name: z.string().min(2),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  duration_days: z.number().min(1),
  unit_price: z.number().optional(),
});

export const createPrescriptionSchema = z.object({
  medical_record_id: z.string().uuid(),
  // doctor_id: z.string().uuid(),
  // patient_id: z.string().uuid(),
  notes: z.string().optional(),
  medicines: z.array(prescriptionMedicineSchema).min(1),
});
