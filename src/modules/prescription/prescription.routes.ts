import { Router } from "express";
import { PrescriptionController } from "./prescription.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createPrescriptionSchema } from "./prescription.validation";

const prescriptionRoute = Router();
const prescriptionController = new PrescriptionController();

prescriptionRoute.post("/", validate(createPrescriptionSchema), prescriptionController.createPrescription);
prescriptionRoute.get("/medical-record/:medicalRecordId", prescriptionController.getByMedicalRecord);
prescriptionRoute.get("/patient/:patientId", prescriptionController.getByPatient);
prescriptionRoute.get("/:prescriptionId", prescriptionController.getById);

export default prescriptionRoute;