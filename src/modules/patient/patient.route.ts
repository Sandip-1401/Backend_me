import { Router } from 'express';
import { PatientCntroller } from './patient.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createPatientSchema, updatePatientSchema } from './patient.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const patientRoute = Router();

const patientController = new PatientCntroller();

patientRoute.post(
  '/',
  authMiddleware,
  requireRole(["PATIENT"]),
  validate(createPatientSchema),
  asyncHandler(patientController.createPatient),
);
patientRoute.get('/', authMiddleware,requireRole(["ADMIN"]), asyncHandler(patientController.getAll));
patientRoute.get('/my-profile', authMiddleware,requireRole(["PATIENT"]), asyncHandler(patientController.getMyProfile));
patientRoute.get('/:id', authMiddleware,requireRole(["ADMIN","DOCTOR","PATIENT"]), asyncHandler(patientController.getById));
patientRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(["PATIENT"]),
  validate(updatePatientSchema),
  asyncHandler(patientController.updatePatient),
);
patientRoute.delete('/:id', authMiddleware, requireRole(["ADMIN","PATIENT"]), asyncHandler(patientController.deletePatient));

patientRoute.patch(
  '/appointments/:id/cancle',
  authMiddleware,
  requireRole(["PATIENT"]),
  asyncHandler(patientController.cancleAppointment),
);

export default patientRoute;
