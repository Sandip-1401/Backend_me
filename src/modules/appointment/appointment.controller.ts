import { AppDataSource } from "../../config/datasource";
import { Doctor } from "../../entities/doctor.entities";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { CreateAppointmentDto, UpdateAppointmentDto } from "./appointment.dto";
import { AppointmentService } from "./appointment.service";
import { Response } from "express";

export class AppointmentController {
   private appointmentService = new AppointmentService();
   private doctorRepository = AppDataSource.getRepository(Doctor);
   createAppointment = async (req: AuthRequest, res: Response) => {
      try {
         const data: CreateAppointmentDto = req.body;
         const userId = String(req.user?.user_id);

         const allDoctors = await this.doctorRepository.find();

         const appointment = await this.appointmentService.createAppointment(userId, data);

         return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            data: appointment
         })

      } catch (err: any) {
         return res.status(400).json({
            success: false,
            message: err.message
         })
      }
   };

   updateAppointment = async (req: AuthRequest, res: Response) => {
      try {
         const userId = String(req.user?.user_id);
      
         const role = await this.appointmentService.getRoleByUserId(userId)

         const appointmentId = String(req.params.id);

         const data: UpdateAppointmentDto = req.body;

         const updated = await this.appointmentService.updateStatus(appointmentId, data, role)

         return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: updated,
         });
      } catch (error: any) {
         return res.status(400).json({
            success: false,
            message: error.message,
         });
      }
   };

   getMyAppointments = async(req: AuthRequest, res: Response) => {
      try {
         const userId = (req as any).user.user_id;

         const appointments =
            await this.appointmentService.getMyAppointments(userId);

         return res.status(200).json({
            success: true,
            data: appointments,
         });
      } catch (error: any) {
         return res.status(400).json({
            success: false,
            message: error.message,
         });
      }
   };

   getAvailableSlots = async (req: AuthRequest, res: Response) => {
      try {

         const doctorId = req.params.id;
         const date = req.query.date as string;

         const slots =
            await this.appointmentService.giveAvilableSlots(
               String(doctorId),
               date
            );

         return res.status(200).json({
            success: true,
            data: slots
         });

      } catch (error: any) {
         return res.status(400).json({
            success: false,
            message: error.message
         });
      }
   };
}