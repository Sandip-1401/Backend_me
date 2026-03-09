import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { DoctorSchedulingService } from './doctorScheduling.service';

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

    return res.status(201).json({
      success: true,
      message: 'Doctor schedule created',
      data: schedule,
    });
  };

  getDoctorSchedule = async (req: AuthRequest, res: Response) => {
    const doctorId = req.params.doctorId;

    const schedules = await this.schedulingService.getDoctorSchedule(String(doctorId));

    return res.status(200).json({
      success: true,
      data: schedules,
    });
  };

  updateSchedule = async (req: AuthRequest, res: Response) => {
    const scheduleId = req.params.id;

    const updated = await this.schedulingService.updateSchedule(String(scheduleId), req.body);

    return res.status(200).json({
      success: true,
      message: 'Schedule updated',
      data: updated,
    });
  };

  deleteSchedule = async (req: AuthRequest, res: Response) => {
    const scheduleId = req.params.id;

    await this.schedulingService.deleteSchedule(String(scheduleId));

    return res.status(200).json({
      success: true,
      message: 'Schedule deleted',
    });
  };
}
