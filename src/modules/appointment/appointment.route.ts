import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createAppointmentSchema, updateAppointmentSchema } from "./appointment.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

const appointmentRoute = Router();

const appointmentController = new AppointmentController();

appointmentRoute.post("/", authMiddleware, validate(createAppointmentSchema), asyncHandler(appointmentController.createAppointment));

appointmentRoute.get("/myappointment",authMiddleware, asyncHandler(appointmentController.getMyAppointments));

appointmentRoute.patch("/:id", authMiddleware, validate(updateAppointmentSchema),asyncHandler(appointmentController.updateAppointment));

appointmentRoute.get("/doctor/:id/avilable-slots", authMiddleware, asyncHandler(appointmentController.getAvailableSlots));

export default appointmentRoute;
