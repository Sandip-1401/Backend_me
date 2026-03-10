import { Router } from 'express';
import { DoctorSchedulingController } from './doctorScheduling.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  createDoctorScheduleSchema,
  updateDoctorScheduleSchema,
} from './doctorScheduling.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const scheduleRoute = Router();

const controller = new DoctorSchedulingController();

scheduleRoute.post(
  '/',
  authMiddleware,requireRole(["DOCTOR"]),
  validate(createDoctorScheduleSchema),
  asyncHandler(controller.createSchedule),
);
scheduleRoute.get('/:doctorId', authMiddleware, asyncHandler(controller.getDoctorSchedule));
scheduleRoute.patch(
  '/:id',
  authMiddleware,requireRole(["DOCTOR"]),
  validate(updateDoctorScheduleSchema),
  asyncHandler(controller.updateSchedule),
);
scheduleRoute.delete('/:id', authMiddleware,requireRole(["DOCTOR"]), asyncHandler(controller.deleteSchedule));

export default scheduleRoute;
