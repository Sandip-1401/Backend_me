import { Router } from "express";
import { MedicalRecordController } from "./medical_record.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const medicalRecordRoute = Router();

const medicalRecordController = new MedicalRecordController();

medicalRecordRoute.post("/", authMiddleware, medicalRecordController.createRecord);
medicalRecordRoute.get("/", authMiddleware, medicalRecordController.getAllRecords)
medicalRecordRoute.get("/patient/:patient_id", authMiddleware, medicalRecordController.getPatientRecord);
medicalRecordRoute.get("/doctor/:doctor_id", authMiddleware, medicalRecordController.getDoctorRecord);
medicalRecordRoute.get("/appointment/:appointment_id", authMiddleware, medicalRecordController.getAppointmentRecored);


export default medicalRecordRoute;