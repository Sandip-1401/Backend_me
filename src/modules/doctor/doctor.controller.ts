import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { DoctorService } from "./doctor.service";

export class DoctorController {
   private doctorService = new DoctorService();

   // POST for logged-in user
   createDoctor = async (req: AuthRequest, res: Response) => {
      try {
         const user_id = req.user!.user_id;
         const doctor = await this.doctorService.createDoctor(user_id, req.body);

         return res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            data: doctor,
         });
      } catch (err: any) {
         return res.status(400).json({
            success: false,
            message: err.message,
         });
      }
   };

   // GET for own profile (logged-in doctor)
   getMyProfile = async (req: AuthRequest, res: Response) => {
      try {
         const user_id = req.user!.user_id;
         const doctor = await this.doctorService.getDoctorByUserId(user_id);

         return res.status(200).json({
            success: true,
            data: doctor,
         });
      } catch (err: any) {
         return res.status(404).json({
            success: false,
            message: err.message,
         });
      }
   };

   // GET /:id - Kisi bhi doctor ka profile dekho (admin / public)
   getDoctorById = async (req: AuthRequest, res: Response) => {
      try {
         const doctor_id = req.params.id;
         const doctor = await this.doctorService.getDoctorById(String(doctor_id));

         return res.status(200).json({
            success: true,
            data: doctor,
         });
      } catch (err: any) {
         return res.status(404).json({
            success: false,
            message: err.message,
         });
      }
   };

   // GET / - All doctors
   getAllDoctors = async (req: AuthRequest, res: Response) => {
      try {
         const doctors = await this.doctorService.getAllDoctors();

         return res.status(200).json({
            success: true,
            data: doctors,
         });
      } catch (err: any) {
         return res.status(500).json({
            success: false,
            message: err.message,
         });
      }
   };

   // PATCH /:id - Doctor update karo
   updateDoctor = async (req: AuthRequest, res: Response) => {
      try {
         const doctor_id = req.params.id;

         const {
            qualification,
            experience_years,
            consultation_fee,
            is_available,
            status,
         } = req.body;

         const data = {
            qualification,
            experience_years,
            consultation_fee,
            is_available,
            status,
         };

         await this.doctorService.updateDoctorById(String(doctor_id), data);

         return res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
         });
      } catch (err: any) {
         return res.status(400).json({
            success: false,
            message: err.message,
         });
      }
   };

   deleteDoctor = async (req: AuthRequest, res: Response) => {
      try{
         const doctorId = req.params.id;
         await this.doctorService.deleteDoctor(String(doctorId));

         return res.status(200).json({
            success: true,
            message: "Doctor delete successfully",
         });
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message,
         });
      }
   }
}