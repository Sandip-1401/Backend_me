import { Router } from "express";
import { PatientCntroller } from "./patient.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createPatientSchema, updatePatientSchema } from "./patient.validation";

const patientRoute = Router();

const patientController = new PatientCntroller();

patientRoute.post("/", authMiddleware, validate(createPatientSchema), patientController.createPatient);
patientRoute.get("/", authMiddleware, patientController.getAll);
patientRoute.get("/my-profile", authMiddleware, patientController.getMyProfile);
patientRoute.get("/:id", authMiddleware, patientController.getById);
patientRoute.patch("/:id", authMiddleware, validate(updatePatientSchema), patientController.updatePatient);
patientRoute.delete("/:id", authMiddleware, patientController.deletePatient);

export default patientRoute;