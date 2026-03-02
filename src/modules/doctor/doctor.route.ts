import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const doctorRoute = Router();
const doctorController = new DoctorController();

doctorRoute.get("/", authMiddleware, doctorController.getAllDoctors);
doctorRoute.get("/my-profile", authMiddleware, doctorController.getMyProfile);
doctorRoute.get("/:id", authMiddleware, doctorController.getDoctorById);
doctorRoute.post("/", authMiddleware, doctorController.createDoctor);
doctorRoute.patch("/:id", authMiddleware, doctorController.updateDoctor);
doctorRoute.delete("/:id", authMiddleware, doctorController.deleteDoctor);

export default doctorRoute;