import { Router } from 'express';
import { AppointmentController } from './appointment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createAppointmentSchema, updateAppointmentSchema } from './appointment.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const appointmentRoute = Router();

const appointmentController = new AppointmentController();

appointmentRoute.get('/', authMiddleware, requireRole(["ADMIN", "DOCTOR", "PATIENT"]), asyncHandler(appointmentController.getAll));

appointmentRoute.post(
  '/',
  authMiddleware,
   requireRole(["PATIENT"]),
  validate(createAppointmentSchema),
  asyncHandler(appointmentController.createAppointment),
);

appointmentRoute.get(
  '/myappointment',
  authMiddleware,
   requireRole(["DOCTOR", "PATIENT"]),
  asyncHandler(appointmentController.getMyAppointments),
);

appointmentRoute.patch(
  '/:id',
  authMiddleware,
   requireRole(["DOCTOR", "PATIENT"]),
  validate(updateAppointmentSchema),
  asyncHandler(appointmentController.updateAppointment),
);

appointmentRoute.get(
  '/doctor/:id/avilable-slots',
  authMiddleware,
   requireRole(["ADMIN", "DOCTOR", "PATIENT"]),
  asyncHandler(appointmentController.getAvailableSlots),
);

export default appointmentRoute;
