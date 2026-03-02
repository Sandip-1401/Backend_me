import { Router } from "express";
import { PatientCntroller } from "./patient.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const patientRoute = Router();

const patientController = new PatientCntroller();

patientRoute.post("/", authMiddleware, patientController.createPatient);
patientRoute.get("/", authMiddleware, patientController.getAll);
patientRoute.get("/my-profile", authMiddleware, patientController.getMyProfile);
patientRoute.get("/:id", authMiddleware, patientController.getById);
patientRoute.patch("/:id", authMiddleware, patientController.updatePatient);
patientRoute.delete("/:id", authMiddleware, patientController.deletePatient);

export default patientRoute;