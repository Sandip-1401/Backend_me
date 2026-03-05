import { Router } from "express";
import { PatientCntroller } from "./patient.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createPatientSchema, updatePatientSchema } from "./patient.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

const patientRoute = Router();

const patientController = new PatientCntroller();

patientRoute.post("/", authMiddleware, validate(createPatientSchema), asyncHandler(patientController.createPatient));
patientRoute.get("/", authMiddleware, asyncHandler(patientController.getAll));
patientRoute.get("/my-profile", authMiddleware, asyncHandler(patientController.getMyProfile));
patientRoute.get("/:id", authMiddleware, asyncHandler(patientController.getById));
patientRoute.patch("/:id", authMiddleware, validate(updatePatientSchema), asyncHandler(patientController.updatePatient));
patientRoute.delete("/:id", authMiddleware, asyncHandler(patientController.deletePatient));

export default patientRoute;