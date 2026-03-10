import { Router } from 'express';
import { PrescriptionController } from './prescription.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createPrescriptionSchema } from './prescription.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { authMiddleware } from '../../middlewares/auth.middleware';

const prescriptionRoute = Router();
const prescriptionController = new PrescriptionController();

prescriptionRoute.post(
  '/',
  authMiddleware,
  validate(createPrescriptionSchema),
  asyncHandler(prescriptionController.createPrescription),
);
prescriptionRoute.get(
  '/medical-record/:medicalRecordId',
  authMiddleware,
  asyncHandler(prescriptionController.getByMedicalRecord),
);
prescriptionRoute.get(
  '/patient/:patientId',
  authMiddleware,
  asyncHandler(prescriptionController.getByPatient),
);

prescriptionRoute.get(
  '/doctor/:doctorId',
  authMiddleware,
  asyncHandler(prescriptionController.getByDoctoe),
);

prescriptionRoute.get(
  '/:prescriptionId',
  authMiddleware,
  asyncHandler(prescriptionController.getById),
);

export default prescriptionRoute;
