import { AppError } from '../../common/errors/AppError';
import { AppDataSource } from '../../config/datasource';
import { Address } from '../../entities/address.entities';
import { Department } from '../../entities/department.entities';
import { Doctor, DoctorStatus } from '../../entities/doctor.entities';
import { Role } from '../../entities/roles.entities';
import { User } from '../../entities/user.entities';
import { UserRole } from '../../entities/user_role.entities';
import UserRoleRepository from '../user-role/user_role.repository';
import { DoctorRepository } from './doctor.repository';
import { getPagination } from '../../utils/pagination.util';
import { buildPagination } from '../../utils/pagination-response.util';
import { Appointment } from '../../entities/appointment.entities';
import {
  AppointmentStatus,
  AppointmentStatusName,
} from '../../entities/appointment_status.entities';
import { sendNotification } from '../../common/utils/sendNotification';
import { NotificationType } from '../../entities/notification.entities';
import { AuthRepository } from '../auth/auth.repository';

const ALLOWED_UPDATE_FIELDS = [
  'qualification',
  'experience_years',
  'consultation_fee',
  'is_available',
  'status',
] as const;

type AllowedUpdateData = Pick<Doctor, (typeof ALLOWED_UPDATE_FIELDS)[number]>;

export class DoctorService {
  private doctorRepository = new DoctorRepository();
  private userRepository = AppDataSource.getRepository(User);
  private addressRepository = AppDataSource.getRepository(Address);
  private departmentRepository = AppDataSource.getRepository(Department);
  private roleRepositry = AppDataSource.getRepository(Role);
  private userRoleRepository = new UserRoleRepository();
  private appointmentRepository = AppDataSource.getRepository(Appointment);
  private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
  private authRepository = new AuthRepository();

  async createDoctor(
    user_id: string,
    payload: {
      department_id: string;
      qualification: string;
      experience_years: number;
      consultation_fee?: number;
      address_id?: string;
    },
  ) {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');

    if (!user.is_verified) {
      throw new AppError('User is not Verified by Admin yet!', 404, 'USER_NOT_VERIFIED');
    }

    const existingDoctor = await this.doctorRepository.findByUserId(user_id);
    if (existingDoctor) throw new AppError('Doctor already exists', 409, 'DOCTOR_ALREADY_EXISTS');

    const department = await this.departmentRepository.findOne({
      where: { department_id: payload.department_id },
    });
    if (!department) throw new AppError('Department not found', 404, 'DEPARTMENT_NOT_FOUND');

    let address: Address | null = null;
    if (payload.address_id) {
      address = await this.addressRepository.findOne({
        where: { address_id: payload.address_id },
      });
      if (!address) throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
    }

    const doctorData: Partial<Doctor> = {
      user,
      department,
      qualification: payload.qualification,
      experience_years: payload.experience_years,
      consultation_fee: payload.consultation_fee,
      address: address ?? undefined,
      status: DoctorStatus.PENDING,
    };

    const doctor = await this.doctorRepository.createDoctor(doctorData);

    const doctorRole = await this.roleRepositry.findOne({
      where: { role_name: 'DOCTOR' },
    });

    if (!doctorRole) throw new AppError('Doctor role not found', 404, 'DOCTOR_ROLE_NOT_FOUND');

    const saved = await this.userRoleRepository.assignRole(user, doctorRole);

    return doctor;
  }

  async getDoctorByUserId(userId: string) {
    const doctorNoRole = await this.doctorRepository.findByUserId(userId);
    if (!doctorNoRole) throw new AppError('Doctor profile not found', 404, 'DOCTOR_PROFILE_NOT_FOUND');
    const role = await this.authRepository.findRoleByUserId(userId);

    const doctor =  {...doctorNoRole, Role: role}

    return {doctor};
  }

  async getDoctorById(doctorId: string) {
    const doctor = await this.doctorRepository.findByDoctorId(doctorId);
    if (!doctor) throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');
    return doctor;
  }

  async getAllDoctors(query: any) {
    const { page, limit, skip } = getPagination(query); //pagination

    const departmentId = query.department_id as string | undefined; //filtering

    const sort = query.sort as string | undefined; //sorting
    const order = (query.order as 'ASC' | 'DESC') || 'ASC';

    const search = query.search as string | undefined; //searching

    const [doctor, total] = await this.doctorRepository.findAllDoctors(
      skip,
      limit,
      departmentId,
      sort,
      order,
      search,
    );

    return buildPagination(doctor, total, page, limit);
  }

  async approveAppointment(userId: string, appointmentId: string) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) throw new AppError('Doctor for this User is not found', 404, 'DOCTOR_NOT_FOUND');

    const doctor = await this.doctorRepository.findByUserId(userId);

    if (!doctor) throw new AppError('Dcotor not found', 404, 'DOCTOR_NOT_FOUND');

    const appointment = await this.appointmentRepository.findOne({
      where: {
        appointment_id: appointmentId,
        doctor: { doctor_id: doctor.doctor_id },
      },
      relations: { doctor: true, patient: true, status: true },
    });
    if (!appointment) throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');

    if (appointment.status.status_name !== AppointmentStatusName.BOOKED) {
      throw new AppError('Only booked appointments can be approved', 400, 'INVALID_STATUS');
    }
    const approvedStatus = await this.appointmentStatusRepository.findOne({
      where: { status_name: AppointmentStatusName.APPROVED },
    });

    if (!approvedStatus) {
      throw new AppError('Approved status not found', 404, 'STATUS_NOT_FOUND');
    }

    const approvedappointment =  await this.doctorRepository.updateAppointmentStatus(appointmentId, {
      status: approvedStatus,
    });

    sendNotification(
      doctor.user.user_id,
      appointment.patient.user.user_id,
      `Appointment approved`,
      `Your appointment for Dr. ${doctor.user.name} is approved`,
      NotificationType.APPOINTMENT,
      appointment.appointment_id,
      new Date()
    )

    return approvedappointment;
  }

  async rejectAppointment(userId: string, appointmentId: string) {
    const doctor = await this.doctorRepository.findByUserId(userId);

    if (!doctor) {
      throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');
    }

    const appointment = await this.appointmentRepository.findOne({
      where: {
        appointment_id: appointmentId,
        doctor: { doctor_id: doctor.doctor_id },
      },
      relations: { doctor: true, patient: {user: true}, status: true },
    });

    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');
    }

    if (appointment.status.status_name !== AppointmentStatusName.BOOKED) {
      throw new AppError('Only booked appointments can be rejected', 400, 'INVALID_STATUS');
    }

    const cancelledStatus = await this.appointmentStatusRepository.findOne({
      where: { status_name: AppointmentStatusName.CANCELLED },
    });

    if (!cancelledStatus) {
      throw new AppError('Cancelled status not found', 404, 'STATUS_NOT_FOUND');
    }

    const rejectedAppointment =  await this.doctorRepository.updateAppointmentStatus(appointmentId, {
      status: cancelledStatus,
    });

    sendNotification(
      doctor.user.user_id,
      appointment.patient.user.user_id,
      `Appointment rejected`,
      `Your appointment for Dr. ${doctor.user.name} is reject`,
      NotificationType.APPOINTMENT,
      appointment.appointment_id,
      new Date()
    )

    return rejectedAppointment;
  }

  async updateDoctorById(doctorId: string, data: Partial<Doctor>) {
    const doctor = await this.doctorRepository.findByDoctorId(doctorId);
    if (!doctor) throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) =>
        (ALLOWED_UPDATE_FIELDS as readonly string[]).includes(key),
      ),
    ) as Partial<AllowedUpdateData>;

    if (Object.keys(filteredData).length === 0) {
      throw new AppError('No valid fields provided to update', 400, 'NO_UPDATE_FIELDS');
    }

    const result = await this.doctorRepository.updateDoctor(doctor.doctor_id, filteredData);

    if (result.affected === 0) throw new AppError('Update failed', 500, 'DOCTOR_UPDATE_FAILED');

    return result;
  }

  async deleteDoctor(doctorId: string) {
    const doctor = await this.doctorRepository.findByDoctorId(doctorId);
    if (!doctor) {
      throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');
    }

    const role = await this.roleRepositry.findOne({
      where: { role_name: 'DOCTOR' },
    });

    if (role) {
      await this.userRoleRepository.deleteUserRole(doctor.user, role);
    }

    return await this.doctorRepository.deleteDoctor(doctorId);
  }
}
