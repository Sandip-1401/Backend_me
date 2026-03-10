import { Router } from 'express';
import { MedicalRecordController } from './medical_record.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createMedicalRecordSchema } from './medicalRecord.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const medicalRecordRoute = Router();

const medicalRecordController = new MedicalRecordController();

medicalRecordRoute.post(
  '/',
  validate(createMedicalRecordSchema),
  authMiddleware,
  requireRole(["DOCTOR"]),
  asyncHandler(medicalRecordController.createRecord),
);
medicalRecordRoute.get('/', authMiddleware,requireRole(["ADMIN"]), asyncHandler(medicalRecordController.getAllRecords));
medicalRecordRoute.get(
  '/patient/:patient_id',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR","PATIENT"]),
  asyncHandler(medicalRecordController.getPatientRecord),
);
medicalRecordRoute.get(
  '/doctor/:doctor_id',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR"]),
  asyncHandler(medicalRecordController.getDoctorRecord),
);
medicalRecordRoute.get(
  '/appointment/:appointment_id',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR","PATIENT"]),
  asyncHandler(medicalRecordController.getAppointmentRecored),
);

export default medicalRecordRoute;
