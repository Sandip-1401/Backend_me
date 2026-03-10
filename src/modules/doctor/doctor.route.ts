import { Router } from 'express';
import { DoctorController } from './doctor.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createDoctorSchema, updateDoctorSchema } from './doctor.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const doctorRoute = Router();
const doctorController = new DoctorController();

doctorRoute.get('/', authMiddleware, requireRole(["ADMIN","DOCTOR","PATIENT"]), doctorController.getAllDoctors);
doctorRoute.get('/my-profile', authMiddleware,requireRole(["DOCTOR"]), asyncHandler(doctorController.getMyProfile));
doctorRoute.get('/:id', authMiddleware,requireRole(["ADMIN","DOCTOR","PATIENT"]), doctorController.getDoctorById);
doctorRoute.post(
  '/',
  authMiddleware,
  requireRole(["DOCTOR"]),
  validate(createDoctorSchema),
  asyncHandler(doctorController.createDoctor),
);
doctorRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(["ADMIN", "DOCTOR"]),
  validate(updateDoctorSchema),
  asyncHandler(doctorController.updateDoctor),
);
doctorRoute.delete('/:id', authMiddleware, requireRole(["ADMIN"]), asyncHandler(doctorController.deleteDoctor));

doctorRoute.patch(
  '/appointments/:id/approve',
  authMiddleware,
  requireRole(["DOCTOR"]),
  asyncHandler(doctorController.approveAppointment),
);

doctorRoute.patch(
  '/appointments/:id/reject',
  authMiddleware,
  requireRole(["DOCTOR"]),
  asyncHandler(doctorController.rejectAppointment),
);
export default doctorRoute;
