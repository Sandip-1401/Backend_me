import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { DoctorSchedulingService } from './doctorScheduling.service';
import { successResponse } from '../../common/utils/successResponse';

export class DoctorSchedulingController {
  private schedulingService = new DoctorSchedulingService();

  createSchedule = async (req: AuthRequest, res: Response) => {
    const doctorId = req.body.doctor_id;

    const schedule = await this.schedulingService.createSchedule({
      doctor: { doctor_id: doctorId } as any,
      day_of_week: req.body.day_of_week,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      slot_duration_minutes: req.body.slot_duration_minutes,
      max_patients: req.body.max_patients,
    });

    return successResponse(res, 'Doctor schedule created', schedule);
  };

  getDoctorSchedule = async (req: AuthRequest, res: Response) => {
    const doctorId = req.params.doctorId;

    const schedules = await this.schedulingService.getDoctorSchedule(String(doctorId));

    return successResponse(res, 'Doctor schedule fetched', schedules);
  };

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
