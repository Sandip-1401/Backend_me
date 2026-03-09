import { Router } from 'express';
import { PrescriptionController } from './prescription.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createPrescriptionSchema } from './prescription.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';

const prescriptionRoute = Router();
const prescriptionController = new PrescriptionController();

prescriptionRoute.post(
  '/',
  validate(createPrescriptionSchema),
  asyncHandler(prescriptionController.createPrescription),
);
prescriptionRoute.get(
  '/medical-record/:medicalRecordId',
  asyncHandler(prescriptionController.getByMedicalRecord),
);
prescriptionRoute.get('/patient/:patientId', asyncHandler(prescriptionController.getByPatient));
prescriptionRoute.get('/:prescriptionId', asyncHandler(prescriptionController.getById));

export default prescriptionRoute;
