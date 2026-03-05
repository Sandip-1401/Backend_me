import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createAppointmentSchema, updateAppointmentSchema } from "./appointment.validation";

const appointmentRoute = Router();

const appointmentController = new AppointmentController();

appointmentRoute.post("/", authMiddleware, validate(createAppointmentSchema), appointmentController.createAppointment);

appointmentRoute.get("/myappointment",authMiddleware, appointmentController.getMyAppointments);

appointmentRoute.patch("/:id", authMiddleware, validate(updateAppointmentSchema),appointmentController.updateAppointment);

appointmentRoute.get("/doctor/:id/avilable-slots", authMiddleware, appointmentController.getAvailableSlots);

export default appointmentRoute;
