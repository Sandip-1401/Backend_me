import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { DoctorService } from './doctor.service';
import { successResponse } from '../../common/utils/successResponse';
import { asyncHandler } from '../../common/utils/asyncHandler';

export class DoctorController {
  private doctorService = new DoctorService();

  createDoctor = async (req: AuthRequest, res: Response) => {
    const user_id = req.user!.user_id;
    const doctor = await this.doctorService.createDoctor(user_id, req.body);

    return successResponse(res, 'Doctor created successfully', doctor)
  };

  getMyProfile = async (req: AuthRequest, res: Response) => {
    const user_id = req.user!.user_id;
    const doctor = await this.doctorService.getDoctorByUserId(user_id);

    return successResponse(res, 'Doctor fetched successfully', doctor)
  };

  getDoctorById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const doctor_id = req.params.id;
    const doctor = await this.doctorService.getDoctorById(String(doctor_id));

    return successResponse(res, 'Doctor fetched successfully', doctor);
  });

  getAllDoctors = async (req: AuthRequest, res: Response) => {
    const doctors = await this.doctorService.getAllDoctors(req.query);
    return successResponse(res, 'Doctors created successfully', doctors)
  };

  approveAppointment = async (req: AuthRequest, res: Response) => {
    const appointmentId = String(req.params.id);
    const userId = String(req.user?.user_id);

    const appointment = await this.doctorService.approveAppointment(userId, appointmentId);

    return successResponse(res, 'Appointment approve by you side.', appointment);
  };

  rejectAppointment = async (req: AuthRequest, res: Response) => {
    const appointmentId = String(req.params.id);
    const userId = String(req.user?.user_id);

    const appointment = await this.doctorService.rejectAppointment(userId, appointmentId);

    return successResponse(res, 'Appointment rejected', appointment);
  };

  updateDoctor = async (req: AuthRequest, res: Response) => {
    const doctor_id = req.params.id;

    const { qualification, experience_years, consultation_fee, is_available, status } = req.body;

    const data = { qualification, experience_years, consultation_fee, is_available, status};

    const doctor = await this.doctorService.updateDoctorById(String(doctor_id), data);

    return successResponse(res, 'Doctor updated successfully', doctor);
  };

  deleteDoctor = async (req: AuthRequest, res: Response) => {
      const doctorId = req.params.id;
      await this.doctorService.deleteDoctor(String(doctorId));
      return successResponse(res, 'Doctor delete successfully');
  };
}
