import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createDoctorSchema, updateDoctorSchema } from "./doctor.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

const doctorRoute = Router();
const doctorController = new DoctorController();

doctorRoute.get("/", authMiddleware, (doctorController.getAllDoctors));
doctorRoute.get("/my-profile", authMiddleware, asyncHandler(doctorController.getMyProfile));
doctorRoute.get("/:id", authMiddleware, doctorController.getDoctorById);
doctorRoute.post("/", authMiddleware, validate(createDoctorSchema), asyncHandler(doctorController.createDoctor));
doctorRoute.patch("/:id", authMiddleware, validate(updateDoctorSchema), asyncHandler(doctorController.updateDoctor));
doctorRoute.delete("/:id", authMiddleware, asyncHandler(doctorController.deleteDoctor));

export default doctorRoute;