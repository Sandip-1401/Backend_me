import { AppDataSource } from '../../config/datasource';
import {
  AppointmentStatus,
  AppointmentStatusName,
} from '../../entities/appointment_status.entities';
import { Doctor, DoctorStatus } from '../../entities/doctor.entities';
import { Patient } from '../../entities/patient.entities';
import { UserRole } from '../../entities/user_role.entities';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { SchedulingRepository } from '../doctor-scheduling/doctorScheduling.repository';
import { DayOfWeek } from '../../entities/doctor_scheduling.entities';
import { AppError } from '../../common/errors/AppError';
import { getPagination } from '../../utils/pagination.util';
import { buildPagination } from '../../utils/pagination-response.util';
import { sendNotification } from '../../common/utils/sendNotification';
import { NotificationType } from '../../entities/notification.entities';

export class AppointmentService {
  private appointmentRepository = new AppointmentRepository();
  private patientRepository = AppDataSource.getRepository(Patient);
  private doctorRepository = AppDataSource.getRepository(Doctor);
  private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
  private roleRepository = AppDataSource.getRepository(UserRole);
  private schedulingRepository = new SchedulingRepository();

  async createAppointment(userId: string, data: CreateAppointmentDto) {
    const patient = await this.patientRepository.findOne({
      where: { user: { user_id: userId } },
      relations: {
        user: true
      }
    });
    if (!patient) throw new AppError('Patient not found', 404, 'PATIENT_NOT_FOUND');

    const doctor = await this.doctorRepository.findOne({
      where: { 
        doctor_id: data.doctor_id,
        status: DoctorStatus.ACTIVE
      },
    });
    if (!doctor) throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');



    const selectedDate = new Date(data.appointment_date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      throw new AppError('Appointment date must be in future', 400, 'INVALID_APPOINTMENT_DATE');
    }

    const appointmentDay = selectedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toUpperCase() as DayOfWeek;
    //selected date de uska day nikala...like 2026-03-4 -> WEDNESDAY

    const schedule = await this.schedulingRepository.findByDoctorAndDay(
      data.doctor_id,
      appointmentDay,
    );

    if (!schedule) {
      throw new AppError('Doctor is not available on this day', 400, 'DOCTOR_NOT_AVAILABLE');
    }

    const [startHour, startMinute] = schedule.start_time.split(':').map(Number);
    //start time -> 09:00 -> split -> ["09","00"] -> .map() -> ['9','0']
    const [endHour, endMinute] = schedule.end_time.split(':').map(Number);
    //same as start time
    const [appointmentHour, appointmentMinute] = data.appointment_time.split(':').map(Number); //same as above

    const startMinutes = startHour * 60 + startMinute;
    //['9','0'] -> 9 * 60 + 0 = 540 minutes
    const endMinutes = endHour * 60 + endMinute;

    const appointmentMinutes = appointmentHour * 60 + appointmentMinute;
    //['9','30'] -> 9 * 60 + 30 = 570 minutes

    if (appointmentMinutes < startMinutes || appointmentMinutes >= endMinutes) {
      //hmmm...doctor ka timing 9 se 12 ka ho and slot 30-30 minutes ke ho to ham 12 baje sloat start nahi kar sakte...isi liye >= end_time use kiya...
      throw new AppError(
        'Appointment time is outside doctor working hours',
        400,
        'APPOINTMENT_OUTSIDE_WORKING_HOURS',
      );
    } //ese samjo data.appointment_time -> selected by patient
    //yuu samjo ki doctor ka starting time 9 baje ka hai and patient 8 baje aa gaya to esa nahi chalega....fir doctor ka ending time 12 baje ka hai fir patient 1 baje ata hai...to wo v nahi chalega....done...!!

    const diff = appointmentMinutes - startMinutes;

    const slotDuration = schedule.slot_duration_minutes;

    if (diff % slotDuration !== 0) {
      throw new AppError('Invalid appointment slot', 400, 'INVALID_APPOINTMENT_SLOT');
    } //diff = 570-540 = 30...we assumind slote_duration 30 minutes...diff % slot_duration_minutes = 30 % 30 = 0....if 0 then valid slot else throw error....like 9:00, 9:30, 10:00 are valid and 9:10, 10:12 are invalid....but according to slot_duration_minutes it can be 60 too...ok...got it...!!

    const slotCount = await this.appointmentRepository.countAppointmentInSlot(
      data.doctor_id,
      data.appointment_date,
      data.appointment_time,
    );

    const maxPatients = schedule.max_patients ?? 1;

    if (slotCount >= maxPatients) {
      throw new AppError('This appointment slot is full', 400, 'APPOINTMENT_SLOT_FULL');
    }

    const bookedStatus = await this.appointmentStatusRepository.findOne({
      where: { status_name: AppointmentStatusName.BOOKED },
    });

    if (!bookedStatus) {
      throw new AppError('Appointment status is missing', 500, 'APPOINTMENT_STATUS_MISSING');
    }

    const appointment =  await this.appointmentRepository.createAppointment({
      patient,
      doctor,
      appointment_date: selectedDate,
      appointment_time: data.appointment_time,
      status: bookedStatus,
      reason: data.reason,
    });

    await sendNotification(
      patient.patient_id,
      doctor.doctor_id,
      `New Appointment`,
      `You have new appointment form ${patient.user.name}`,
      NotificationType.APPOINTMENT,
      appointment.appointment_id
    )

    return appointment;
  }

  async giveAvilableSlots(doctorId: string, date: string) {
    const selectedDate = new Date(date);

    const appointmentDay = selectedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toUpperCase() as DayOfWeek;

    const schedule = await this.schedulingRepository.findByDoctorAndDay(doctorId, appointmentDay);
    if (!schedule) {
      throw new AppError('Doctor is not available on this day', 400, 'DOCTOR_NOT_AVAILABLE');
    }

    const appointments = await this.appointmentRepository.countAppointmentsForDoctorAndDate(
      doctorId,
      date,
    );

    const [startHour, startMinute] = schedule.start_time.split(':').slice(0, 2).map(Number);
    const [endHour, endMinute] = schedule.end_time.split(':').slice(0, 2).map(Number);

    let startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    const slots: string[] = [];

    while (startMinutes < endMinutes) {
      const hour = Math.floor(startMinutes / 60)
        .toString()
        .padStart(2, '0');

      const minutes = (startMinutes % 60).toString().padStart(2, '0');

      const slotTime = `${hour}:${minutes}`;

      const slotCount = appointments.filter((a) => a.appointment_time === slotTime).length;

      const maxPatients = schedule.max_patients ?? 1;

      if (slotCount < maxPatients) {
        slots.push(slotTime);
      }

      startMinutes += schedule.slot_duration_minutes;
    }

    return slots;
  }

  async updateStatus(appointmentId: string, data: UpdateAppointmentDto, role: string) {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');
    }

    if (!data.status) return appointment;

    if (appointment.status.status_name === AppointmentStatusName.COMPLETED) {
      throw new AppError(
        'Completed appointment cannot be modified',
        400,
        'APPOINTMENT_ALREADY_COMPLETED',
      );
    }

    if (role === 'PATIENT' && data.status !== AppointmentStatusName.CANCELLED) {
      throw new AppError('Patient can only cancel appointment', 403, 'PATIENT_CANCEL_ONLY');
    }

    if (role === 'DOCTOR' && data.status !== AppointmentStatusName.APPROVED) {
      throw new AppError('Doctor can only approve appointment', 403, 'DOCTOR_APPROVE_ONLY');
    }

    const newStatus = await this.appointmentStatusRepository.findOne({
      where: {
        status_name: data.status,
      },
    });

    if (!newStatus) {
      throw new AppError('Invalid status', 400, 'INVALID_APPOINTMENT_STATUS');
    }

    appointment.status = newStatus;

    return await this.appointmentRepository.save(appointment);
  }

  async getAllAppointments(query: any) {
    const { page, limit, skip } = getPagination(query);

    const statusId = query.status_id as string | undefined;

    const sort = query.sort as string | undefined;
    const order = (query.order as 'ASC' | 'DESC') || 'ASC';

    const search = query.search as string | undefined;

    const [appointment, total] = await this.appointmentRepository.findAll(
      skip,
      limit,
      statusId,
      sort,
      order,
      search,
    );

    return buildPagination(appointment, total, page, limit);
  }

  async getMyAppointments(userId: string) {
    const patient = await this.patientRepository.findOne({
      where: { user: { user_id: userId } },
    });

    if (patient) {
      return await this.appointmentRepository.findBtPatientId(patient.patient_id);
    }

    const doctor = await this.doctorRepository.findOne({
      where: { user: { user_id: userId } },
    });

    if (doctor) {
      return await this.appointmentRepository.findByDoctorId(doctor.doctor_id);
    }

    throw new AppError('User has no patient or doctor profile', 404, 'USER_PROFILE_NOT_FOUND');
  }

  async getRoleByUserId(userId: string) {
    const roleRow = await this.roleRepository.findOne({
      where: { user: { user_id: userId } },
      relations: { role: true },
    });
    if (!roleRow) {
      throw new AppError('User role not found', 404, 'ROLE_NOT_FOUND');
    }

    return roleRow?.role.role_name;
  }
}
