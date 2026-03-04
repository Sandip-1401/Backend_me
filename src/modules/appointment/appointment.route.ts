import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const appointmentRoute = Router();

const appointmentController = new AppointmentController();

appointmentRoute.post("/", authMiddleware, appointmentController.createAppointment);
appointmentRoute.get("/myappointment",authMiddleware, appointmentController.getMyAppointments);
appointmentRoute.patch("/:id", authMiddleware, appointmentController.updateAppointment);
appointmentRoute.get("/doctor/:id/avilable-slots", authMiddleware, appointmentController.getAvailableSlots);

export default appointmentRoute;
