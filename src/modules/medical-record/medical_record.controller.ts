import { AuthRequest } from "../../middlewares/auth.middleware";
import { CreateMedicalRecordDto } from "./dto/createMedicalRecordDto";
import { MedicalRecordService } from "./medical_record.service";
import { Response } from "express";

export class MedicalRecordController{
   private medicalRecordService = new MedicalRecordService();

   createRecord = async (req: AuthRequest, res: Response) => {
      try{
         const data: CreateMedicalRecordDto = req.body;

         const record = await this.medicalRecordService.createRecord(data);

         return res.status(201).json({
            success: true,
            message: "Medical Record created Successfully",
            data: record
         })
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message
         })
      }
   };

   getPatientRecord = async (req: AuthRequest, res: Response) => {
      try{
         const {patient_id} = req.params;

         const record = await this.medicalRecordService.getPatientRecords(String(patient_id));

         return res.status(200).json({
            success: true,
            data: record
         })
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message
         })
      }
   };

   getDoctorRecord = async (req: AuthRequest, res: Response) => {
      try{
         const { doctor_id } = req.params;

         const record = await this.medicalRecordService.getDoctorRecords(String(doctor_id));

         return res.status(200).json({
            success: true,
            data: record
         })
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message
         })
      }
   };
   
     getAppointmentRecored = async (req: AuthRequest, res: Response) => {
      try{
         const { appointment_id } = req.params;

         const record = await this.medicalRecordService.getAppointmentRecord(String(appointment_id));

         return res.status(200).json({
            success: true,
            data: record
         })
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message
         })
      }
   };

   getAllRecords = async (req: AuthRequest, res: Response) => {
      try{

         const record = await this.medicalRecordService.getAllAppointment();

         return res.status(200).json({
            success: true,
            data: record
         })
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message
         })
      }
   }
}