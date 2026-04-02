import { AppError } from '../../common/errors/AppError';
import { DoctorStatus } from '../../entities/doctor.entities';
import { DayOfWeek, DoctorScheduling } from '../../entities/doctor_scheduling.entities';
import { DoctorRepository } from '../doctor/doctor.repository';
import { SchedulingRepository } from './doctorScheduling.repository';
import { CreateDoctorScheduleDto } from './dto/createDoctorScheduleDto';

export class DoctorSchedulingService {
  private schedulingRepository = new SchedulingRepository();
  private doctorRepository = new DoctorRepository();

  async createSchedule(data: CreateDoctorScheduleDto) {
    const doctor_id = data.doctor_id

    const doctor = await this.doctorRepository.findByDoctorId(doctor_id);

    if (!doctor) {
      throw new AppError("Can not found Logged in doctor", 404, "CAN_NOT_FOUND_LOGGED_IN_DOCTOR")
    }

    if (doctor?.status !== DoctorStatus.ACTIVE) {
      throw new AppError('Doctor is not active to create schedule', 401, 'DOCTOR_NOT_ACTIVE');
    }

    if (!doctor || !data.day_of_week) {
      throw new AppError('Doctor and day_of_week are required', 400, 'DOCTOR_AND_DAY_REQUIRED');
    }

    if (!data.start_time || !data.end_time) {
      throw new AppError('Start time and end time are required', 400, 'TIME_RANGE_REQUIRED');
    }

    if (data.start_time >= data.end_time) {
      throw new AppError('Start time must be before end time', 400, 'INVALID_TIME_RANGE');
    }

    const existingSchedule = await this.schedulingRepository.findByDoctorAndDay(
      doctor.doctor_id,
      data.day_of_week,
    );

    if (existingSchedule) {
      throw new AppError(
        'Schedule already exists for this doctor on this day',
        409,
        'SCHEDULE_ALREADY_EXISTS',
      );
    }

    return await this.schedulingRepository.createSchedul({
      day_of_week: data.day_of_week,
      start_time: data.start_time,
      end_time: data.end_time,
      slot_duration_minutes: data.slot_duration_minutes,
      max_patients: data.max_patients,

      doctor: { doctor_id: data.doctor_id } as any,
    });
  }

  async getDoctorSchedule(doctorId: string) {
    return await this.schedulingRepository.findByDoctorId(doctorId);
  };

  async getMySchedule(userId: string){
    return await this.schedulingRepository.findByUserId(userId);
  }

  async updateSchedule(scheduleId: string, data: Partial<DoctorScheduling>) {
    if (data.start_time && data.end_time) {
      if (data.start_time >= data.end_time) {
        throw new AppError('Start time must be before end time', 400, 'INVALID_TIME_RANGE');
      }
    }

    return await this.schedulingRepository.updateSchedule(scheduleId, data);
  }

  async deleteSchedule(scheduleId: string) {
    return await this.schedulingRepository.deleteSchedule(scheduleId);
  }
}
