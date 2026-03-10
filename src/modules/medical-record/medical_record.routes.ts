import { Router } from 'express';
import { MedicalRecordController } from './medical_record.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createMedicalRecordSchema } from './medicalRecord.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';

const medicalRecordRoute = Router();

const medicalRecordController = new MedicalRecordController();

medicalRecordRoute.post(
  '/',
  validate(createMedicalRecordSchema),
  authMiddleware,
  asyncHandler(medicalRecordController.createRecord),
);
medicalRecordRoute.get('/', authMiddleware, asyncHandler(medicalRecordController.getAllRecords));
medicalRecordRoute.get(
  '/patient/:patient_id',
  authMiddleware,
  asyncHandler(medicalRecordController.getPatientRecord),
);  
medicalRecordRoute.get(
  '/doctor/:doctor_id',
  authMiddleware,
  asyncHandler(medicalRecordController.getDoctorRecord),
);
medicalRecordRoute.get(
  '/appointment/:appointment_id',
  authMiddleware,
  asyncHandler(medicalRecordController.getAppointmentRecored),
);

export default medicalRecordRoute;
