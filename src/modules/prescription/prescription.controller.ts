import { Response } from "express";
import { PrescriptionService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/createPrescriptionDto";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class PrescriptionController {

   private prescriptionService = new PrescriptionService();

   createPrescription = async (req: AuthRequest, res: Response) => {
      try {

         const data: CreatePrescriptionDto = req.body;

         const prescription =
            await this.prescriptionService.createPrescription(data);

         return res.status(201).json({
            success: true,
            message: "Prescription created successfully",
            data: prescription
         });

      } catch (err: any) {

         return res.status(400).json({
            success: false,
            message: err.message
         });

      }
   };

   getByMedicalRecord = async (req: AuthRequest, res: Response) => {
      try{
         const { medicalRecordId } = req.params;

         const data = await this.prescriptionService.getByMedicalRecord(String(medicalRecordId));

         return res.status(200).json({
            success: true,
            data
         });
      }catch(err:any){
         return res.status(400).json({
            success:false,
            message: err.message
         });
      }
   };

   getByPatient = async (req: AuthRequest, res: Response) => {
      try{

         const { patientId } = req.params;

         const data = await this.prescriptionService.getByPatient(String(patientId));

         return res.status(200).json({
            success: true,
            data
         });

      }catch(err:any){

         return res.status(400).json({
            success: false,
            message: err.message
         });

      }
   };

   getById = async (req: AuthRequest, res: Response) => {
      try{

         const { prescriptionId } = req.params;

         const data =
            await this.prescriptionService.getById(String(prescriptionId));

         return res.status(200).json({
            success: true,
            data
         });

      }catch(err:any){

         return res.status(400).json({
            success: false,
            message: err.message
         });

      }
   }

}