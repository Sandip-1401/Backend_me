import { Router } from "express";
import { DoctorSchedulingController } from "./doctorScheduling.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createDoctorScheduleSchema, updateDoctorScheduleSchema } from "./doctorScheduling.validation";

const scheduleRoute = Router();

const controller = new DoctorSchedulingController();

scheduleRoute.post( "/", authMiddleware, validate(createDoctorScheduleSchema), controller.createSchedule);
scheduleRoute.get( "/:doctorId", authMiddleware, controller.getDoctorSchedule);
scheduleRoute.patch( "/:id", validate(updateDoctorScheduleSchema), authMiddleware, controller.updateSchedule);
scheduleRoute.delete( "/:id", authMiddleware, controller.deleteSchedule);

export default scheduleRoute;