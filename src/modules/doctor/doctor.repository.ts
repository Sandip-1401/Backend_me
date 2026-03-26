import { ILike } from 'typeorm';
import { AppDataSource } from '../../config/datasource';
import { Doctor, DoctorStatus } from '../../entities/doctor.entities';
import { Appointment } from '../../entities/appointment.entities';
import {
  AppointmentStatus,
  AppointmentStatusName,
} from '../../entities/appointment_status.entities';

export class DoctorRepository {
  private doctorRepository = AppDataSource.getRepository(Doctor);
  private appointmentRepository = AppDataSource.getRepository(Appointment);

  async createDoctor(data: Partial<Doctor>) {
    const doctor = this.doctorRepository.create(data);
    return this.doctorRepository.save(doctor);
  }

  async findByUserId(userId: string) {
    return this.doctorRepository.findOne({
      where: {
        user: { user_id: userId },
      },
      relations: ['user', 'department', 'address'],
    });
  }

  async findByDoctorId(doctorId: string) {
    return this.doctorRepository.findOne({
      where: { doctor_id: doctorId },
      relations: ['user', 'department', 'address'],
    });
  }

  async findDoctorByMedicalRecord(medical_record_id: string) {
    return await this.doctorRepository.findOne({
      where: { medical_records: { medical_record_id: medical_record_id } },
    });
  }

  async findAllDoctors(
    skip: number,
    limit: number,
    departmentId?: string,
    sort?: string,
    order: 'ASC' | 'DESC' = 'ASC',
    search?: string,
  ): Promise<[Doctor[], number]> {
    const query = this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .leftJoinAndSelect('doctor.department', 'department')
      .leftJoinAndSelect('doctor.address', 'address')
      .where('doctor.status = :status', {status: DoctorStatus.ACTIVE})

    if (departmentId) {
      query.andWhere('department.department_id = :departmentId', {
        departmentId,
      });
    }

    if (search) {
      query.andWhere('(user.name ILIKE :search OR doctor.qualification ILIKE :search OR department.department_name ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    const allowedSortFields = ['experience_years', 'created_at', 'consultation_fee'];

    if (sort && allowedSortFields.includes(sort)) {
      query.orderBy(`doctor.${sort}`, order);
    } //sort=qualification;DROP TABLE doctor koi esa v bhej sakta hai...to SQL injection se bach ne ke liye...
    else {
      query.orderBy('doctor.created_at', 'DESC');
    }

    query.distinct(true);
    //Important when using joins...kyuki agar doc1 -> dep1 and dep2 dono me hai...to vo do var ayega...at the end ham to doctor hi fetch kar rahe hai...deparment se koi lenedene nahi hai...

    query.skip(skip).take(limit);

    const [doctors, total] = await query.getManyAndCount();

    return [doctors, total];
  }

  async updateAppointmentStatus(appointmentId: string, data: Partial<Appointment>) {
    await this.appointmentRepository.update({ appointment_id: appointmentId }, data);

    return await this.appointmentRepository.findOne({
      where: { appointment_id: appointmentId },
      relations: {
        doctor: true,
        patient: true,
        status: true,
      },
    });
  }

  async updateDoctor(doctorId: string, data: Partial<Doctor>) {
    return this.doctorRepository.update({ doctor_id: doctorId }, data);
  }

  async deleteDoctor(doctorId: string) {
    return this.doctorRepository.delete(doctorId);
  }
}
