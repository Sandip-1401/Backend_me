import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const appointmentRoute = Router();

const appointmentController = new AppointmentController();

appointmentRoute.post("/", authMiddleware, appointmentController.createAppointment);
appointmentRoute.get("/myappointment",authMiddleware, appointmentController.getMyAppointments);
appointmentRoute.patch("/:id", authMiddleware, appointmentController.updateAppointment);

export default appointmentRoute;
