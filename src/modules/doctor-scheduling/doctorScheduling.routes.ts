import { Router } from 'express';
import { DoctorSchedulingController } from './doctorScheduling.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  createDoctorScheduleSchema,
  updateDoctorScheduleSchema,
} from './doctorScheduling.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';

const scheduleRoute = Router();

const controller = new DoctorSchedulingController();

scheduleRoute.post(
  '/',
  authMiddleware,
  validate(createDoctorScheduleSchema),
  asyncHandler(controller.createSchedule),
);
scheduleRoute.get('/:doctorId', authMiddleware, asyncHandler(controller.getDoctorSchedule));
scheduleRoute.patch(
  '/:id',
  validate(updateDoctorScheduleSchema),
  authMiddleware,
  asyncHandler(controller.updateSchedule),
);
scheduleRoute.delete('/:id', authMiddleware, asyncHandler(controller.deleteSchedule));

export default scheduleRoute;
