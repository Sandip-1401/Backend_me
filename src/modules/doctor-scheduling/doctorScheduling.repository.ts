import { AppDataSource } from '../../config/datasource';
import { DayOfWeek, DoctorScheduling } from '../../entities/doctor_scheduling.entities';

export class SchedulingRepository {
  private schedulingRepository = AppDataSource.getRepository(DoctorScheduling);

  async createSchedul(data: Partial<DoctorScheduling>) {
    const schedule = this.schedulingRepository.create(data);
    return await this.schedulingRepository.save(schedule);
  }

  async findByDoctorId(doctorId: string) {
    return await this.schedulingRepository.find({
      where: { doctor: { doctor_id: doctorId } },
      relations: {
        doctor: {
          user: true
        },
      },
    });
  }

  async findByDoctorAndDay(doctorId: string, day: DayOfWeek) {
    return await this.schedulingRepository.findOne({
      where: {
        doctor: { doctor_id: doctorId },
        day_of_week: day,
      },
      relations: {
        doctor: true,
      },
    });
  }

  async updateSchedule(scheduleId: string, data: Partial<DoctorScheduling>) {
    await this.schedulingRepository.update({ schedule_id: scheduleId }, data);

    return this.schedulingRepository.findOne({
      where: { schedule_id: scheduleId },
    });
  }

  async deleteSchedule(scheduleId: string) {
    return await this.schedulingRepository.delete({ schedule_id: scheduleId });
  }
}
