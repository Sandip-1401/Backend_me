import { successResponse } from '../../common/utils/successResponse';
import { AppDataSource } from '../../config/datasource';
import { Doctor } from '../../entities/doctor.entities';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
import { AppointmentService } from './appointment.service';
import { Response } from 'express';

export class AppointmentController {
  private appointmentService = new AppointmentService();
  private doctorRepository = AppDataSource.getRepository(Doctor);

  createAppointment = async (req: AuthRequest, res: Response) => {
    const data: CreateAppointmentDto = req.body;
    const userId = String(req.user?.user_id);

    const allDoctors = await this.doctorRepository.find();

    const appointment = await this.appointmentService.createAppointment(userId, data);

    return successResponse(res, 'Appointment booked successfully', appointment);
  };

  updateAppointment = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.user_id);

    const role = await this.appointmentService.getRoleByUserId(userId);

    const appointmentId = String(req.params.id);

    const data: UpdateAppointmentDto = req.body;

    const updated = await this.appointmentService.updateStatus(appointmentId, data, role);

    return successResponse(res, 'Appointment updated successfully', updated);
  };

  getMyAppointments = async (req: AuthRequest, res: Response) => {
    const userId = (req as any).user.user_id;

    const appointments = await this.appointmentService.getMyAppointments(userId);

    return successResponse(res, 'Appointment fetched successfully', appointments);
  };

  getAll = async (req: AuthRequest, res: Response) => {
    const appointments = await this.appointmentService.getAllAppointments(req.query);

    return successResponse(res, 'Appointment fetched successfully', appointments);
  };

  getAvailableSlots = async (req: AuthRequest, res: Response) => {
    const doctorId = req.params.id;
    const date = req.query.date as string;

    const slots = await this.appointmentService.giveAvilableSlots(String(doctorId), date);

    return successResponse(res, 'Available slots...', slots);
  };
}
