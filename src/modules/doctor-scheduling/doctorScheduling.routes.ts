import { Router } from "express";
import { DoctorSchedulingController } from "./doctorScheduling.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const scheduleRoute = Router();

const controller = new DoctorSchedulingController();

scheduleRoute.post( "/", authMiddleware, controller.createSchedule);
scheduleRoute.get( "/:doctorId", authMiddleware, controller.getDoctorSchedule);
scheduleRoute.patch( "/:id", authMiddleware, controller.updateSchedule);
scheduleRoute.delete( "/:id", authMiddleware, controller.deleteSchedule);

export default scheduleRoute;