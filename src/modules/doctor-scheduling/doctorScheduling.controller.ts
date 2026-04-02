import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { DoctorSchedulingService } from './doctorScheduling.service';
import { successResponse } from '../../common/utils/successResponse';
import { AppError } from '../../common/errors/AppError';
import { DoctorRepository } from '../doctor/doctor.repository';

export class DoctorSchedulingController {
  private schedulingService = new DoctorSchedulingService();
   private doctorRepository = new DoctorRepository();

  createSchedule = async (req: AuthRequest, res: Response) => {
    
    const user_id = String(req.user?.user_id);
    if (!user_id) {
      throw new AppError('Can not fetch user id', 400, 'CAN_NOT_FETCH_USER_ID');
    }

    const doctor = await this.doctorRepository.findByUserId(user_id);
    
    if (!doctor) {
      throw new AppError("Can not found Logged in doctor", 404, "CAN_NOT_FOUND_LOGGED_IN_DOCTOR")
    }
    
    const doctor_id = doctor.doctor_id

    if(!doctor_id){
      throw new AppError("Can not found doctor_id", 404, "CAN_NOT_FOUND_DOCTOR_ID")
    }

    const schedule = await this.schedulingService.createSchedule({...{
      day_of_week: req.body.day_of_week,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      slot_duration_minutes: req.body.slot_duration_minutes,
      max_patients: req.body.max_patients,
    }, doctor_id});

    return successResponse(res, 'Doctor schedule created', schedule);
  };

  getDoctorSchedule = async (req: AuthRequest, res: Response) => {
    const doctorId = req.params.doctorId;

    const schedules = await this.schedulingService.getDoctorSchedule(String(doctorId));

    return successResponse(res, 'Doctor schedule fetched', schedules);
  };

  getMySchedules = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.user_id;

    const schedules = await this.schedulingService.getMySchedule(String(userId));

    return successResponse(res, 'Doctor schedule fetched', schedules);
  }

  updateSchedule = async (req: AuthRequest, res: Response) => {
    const scheduleId = req.params.id;

    const updated = await this.schedulingService.updateSchedule(String(scheduleId), req.body);

    return successResponse(res, 'Doctor schedule updated successfully', updated);
  };

  deleteSchedule = async (req: AuthRequest, res: Response) => {
    const scheduleId = req.params.id;

    await this.schedulingService.deleteSchedule(String(scheduleId));

    return successResponse(res, 'Doctor schedule delete successfully');
  };
}
