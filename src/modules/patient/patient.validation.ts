import { z } from 'zod';
import { Gender, PatientStatus } from '../../entities/patient.entities';

const bloodGroup = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

export const createPatientSchema = z.object({
  user_id: z.string().uuid().optional(),
  address_id: z.string().uuid().optional(),
  blood_group: bloodGroup.optional(),
  date_of_birth: z.coerce
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional(),
  gender: z.nativeEnum(Gender).optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
});

export const updatePatientSchema = z.object({
  address_id: z.string().uuid().optional(),
  blood_group: bloodGroup.optional(),
  date_of_birth: z.coerce
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional(),
  gender: z.nativeEnum(Gender).optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  status: z.nativeEnum(PatientStatus).optional(),
});
