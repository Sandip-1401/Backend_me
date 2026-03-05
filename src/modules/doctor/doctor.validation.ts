import { z } from "zod";
import { DoctorStatus } from "../../entities/doctor.entities";

export const createDoctorSchema = z.object({
   department_id: z.string().uuid(),
   qualification: z.string().min(2),
   experience_years: z.number().min(0),
   consultation_fee: z.number().optional(),
   address_id: z.string().uuid().optional()
});

export const updateDoctorSchema = z.object({
  qualification: z.string().min(2).optional(),
  experience_years: z.number().min(0).optional(),
  consultation_fee: z.number().optional(),
  is_available: z.boolean().optional(),
  status: z.nativeEnum(DoctorStatus).optional()
});