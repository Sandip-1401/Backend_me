import { AuthRequest } from "../../middlewares/auth.middleware";
import { CreatePatientDto } from "./dto/createPatientDto";
import { UpdatePatientDto } from "./dto/updatePatientDto";
import { PatientService } from "./patient.service";
import { Response } from "express";

export class PatientCntroller {
   private patientService = new PatientService();

   createPatient = async (req: AuthRequest, res: Response) => {
      try {
         const data = req.body as CreatePatientDto;

         const patient = await this.patientService.createPatient(data);

         return res.status(201).json({
            success: true,
            message: "Patient created Successfully",
            data: patient
         })
      } catch (err: any) {
         return res.status(400).json({
            success: false,
            mesage: err.message
         })
      }
   };

   getAll = async (req: AuthRequest, res: Response) => {
      try {
         const patients = await this.patientService.findAllPatient();

         return res.status(200).json({
            success: true,
            data: patients
         })
      } catch (err: any) {
         return res.status(500).json({
            success: false,
            message: err.message
         })
      }
   };

   getById = async (req: AuthRequest, res: Response) => {
      try {
         const patient_id = String(req.params.id);
         const patient = await this.patientService.findPatientById(patient_id);

         return res.status(200).json({
            success: true,
            data: patient
         })
      } catch (err: any) {
         return res.status(404).json({
            success: false,
            message: err.message
         })
      }
   };

   getMyProfile = async (req: AuthRequest, res: Response) => {
      try {
         const user_id = String(req.user?.user_id);
         const myprofile = await this.patientService.findPatientByUserId(user_id);

         return res.status(200).json({
            success: true,
            data: myprofile
         })
      } catch (err: any) {
         return res.status(404).json({
            success: false,
            message: err.message
         })
      }
   };

   updatePatient = async (req: AuthRequest, res: Response) => {
      try {
         const patient_id = String(req.params.id);
         const data = req.body as UpdatePatientDto;

         await this.patientService.updatePatient(patient_id, data);

         return res.status(200).json({
            success: true,
            message: "Patient updated Successfully",
         })
      } catch (err: any) {
         return res.status(404).json({
            success: false,
            message: err.message
         })
      }
   };

   deletePatient = async (req: AuthRequest, res: Response) => {
      try {
         const patient_id = String(req.params.id);

         await this.patientService.deletePatient(patient_id);
         return res.status(200).json({
            success: true,
            message: "Patient deleted Successfully",
         })
      } catch (err: any) {
         return res.status(404).json({
            success: false,
            message: err.message
         })
      }
   }
}