import { Router } from "express";
import { PrescriptionController } from "./prescription.controller";

const prescriptionRoute = Router();
const prescriptionController = new PrescriptionController();

prescriptionRoute.post("/", prescriptionController.createPrescription);
prescriptionRoute.get("/medical-record/:medicalRecordId", prescriptionController.getByMedicalRecord);
prescriptionRoute.get("/patient/:patientId", prescriptionController.getByPatient);
prescriptionRoute.get("/:prescriptionId", prescriptionController.getById);

export default prescriptionRoute;