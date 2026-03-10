import { Router } from 'express';
import { PrescriptionController } from './prescription.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createPrescriptionSchema } from './prescription.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const prescriptionRoute = Router();
const prescriptionController = new PrescriptionController();

prescriptionRoute.post(
  '/',
  authMiddleware,
  requireRole(["DOCTOR"]),
  validate(createPrescriptionSchema),
  asyncHandler(prescriptionController.createPrescription),
);
prescriptionRoute.get(
  '/medical-record/:medicalRecordId',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR","PATIENT"]),
  asyncHandler(prescriptionController.getByMedicalRecord),
);
prescriptionRoute.get(
  '/patient/:patientId',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR","PATIENT"]),
  asyncHandler(prescriptionController.getByPatient),
);

prescriptionRoute.get(
  '/doctor/:doctorId',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR"]),
  asyncHandler(prescriptionController.getByDoctoe),
);

prescriptionRoute.get(
  '/:prescriptionId',
  authMiddleware,
  requireRole(["ADMIN","DOCTOR","PATIENT"]),
  asyncHandler(prescriptionController.getById),
);

export default prescriptionRoute;
