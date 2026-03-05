import { Router } from "express";
import { MedicalRecordController } from "./medical_record.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createMedicalRecordSchema } from "./medicalRecord.validation";

const medicalRecordRoute = Router();

const medicalRecordController = new MedicalRecordController();

medicalRecordRoute.post("/", validate(createMedicalRecordSchema), authMiddleware, medicalRecordController.createRecord);
medicalRecordRoute.get("/", authMiddleware, medicalRecordController.getAllRecords)
medicalRecordRoute.get("/patient/:patient_id", authMiddleware, medicalRecordController.getPatientRecord);
medicalRecordRoute.get("/doctor/:doctor_id", authMiddleware, medicalRecordController.getDoctorRecord);
medicalRecordRoute.get("/appointment/:appointment_id", authMiddleware, medicalRecordController.getAppointmentRecored);


export default medicalRecordRoute;