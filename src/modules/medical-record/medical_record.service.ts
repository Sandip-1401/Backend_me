import { AppError } from '../../common/errors/AppError';
import { sendNotification } from '../../common/utils/sendNotification';
import { AppointmentStatusName } from '../../entities/appointment_status.entities';
import { NotificationType } from '../../entities/notification.entities';
import { buildPagination } from '../../utils/pagination-response.util';
import { getPagination } from '../../utils/pagination.util';
import { AppointmentRepository } from '../appointment/appointment.repository';
import { DoctorRepository } from '../doctor/doctor.repository';
import PatientRepository from '../patient/patient.repository';
import { CreateMedicalRecordDto } from './dto/createMedicalRecordDto';
import { MedicalRecordRepository } from './medical-record.repository';

export class MedicalRecordService {
  private medicalRecordRepository = new MedicalRecordRepository();
  private appointmentRepository = new AppointmentRepository();
  private doctorRepository = new DoctorRepository();
  private patientRepository = new PatientRepository();

  async createRecord(userId: string, data: CreateMedicalRecordDto) {
    
    const doctor = await this.doctorRepository.findByUserId(userId);

    if (!doctor) throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');

    const appointment = await this.appointmentRepository.findById(data.appointment_id);

    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');
    }

    const existingRecord = await this.medicalRecordRepository.findByAppointment(
      data.appointment_id,
    );

    if (appointment.doctor.doctor_id !== doctor.doctor_id) {
      throw new AppError(
        'You are not allowed to create record for this appointment',
        403,
        'FORBIDDEN',
      );
    }

    if (existingRecord) {
      throw new AppError(
        'Medical record already exists for this appointment',
        409,
        'MEDICAL_RECORD_ALREADY_EXISTS',
      );
    }

    if (appointment.status.status_name !== AppointmentStatusName.APPROVED) {
      throw new AppError(
        'Medical record can only be created when appointment is approved',
        400,
        'APPOINTMENT_NOT_COMPLETED',
      );
    }

    const record = await this.medicalRecordRepository.createRecord({
      patient: appointment.patient,
      doctor: appointment.doctor,
      appointment: appointment,
      diagnosis: data.diagnosis,
      notes: data.notes,
    });

    await sendNotification(
      appointment.doctor.user.user_id,
      appointment.patient.user.user_id,
      `Medical record created`,
      `Dr.  ${appointment.doctor.user.name} create your Medical record for your appointment`,
      NotificationType.APPOINTMENT,
      appointment.appointment_id
    )

    return record;
  }

  async getAppointmentRecord(appointmentId: string) {
    const record = await this.medicalRecordRepository.findByAppointment(appointmentId);
    if (!record)
      throw new AppError('No records found for this appointment', 404, 'MEDICAL_RECORD_NOT_FOUND');
    return record;
  }

  async getPatientRecords(patientId: string) {
    const record = await this.medicalRecordRepository.findByPatient(patientId);
    if (!record || record.length === 0)
      throw new AppError(
        'No records found for this patient',
        404,
        'PATIENT_MEDICAL_RECORDS_NOT_FOUND',
      );

    return record;
  }

  async getDoctorRecords(doctorId: string) {
    const record = await this.medicalRecordRepository.findByDoctor(doctorId);
    if (!record || record.length === 0)
      throw new AppError(
        'No records found for this doctor',
        404,
        'DOCTOR_MEDICAL_RECORDS_NOT_FOUND',
      );
    return record;
  }

  async getMyRecords(userId: string){
    const patient = await this.patientRepository.findByUserId(userId);

    if(patient){
      return await this.medicalRecordRepository.findByPatient(patient.patient_id)
    }

    const doctor = await this.doctorRepository.findByUserId(userId);

    if(doctor){
      return await this.medicalRecordRepository.findByDoctor(doctor.doctor_id)
    }

    throw new AppError("Logged in user is not nghter patient nor doctor", 400, "NO_PATIENT_NOR_DOCTOR");
  }

  async getMedicalRecordById(user_id: string, medical_recod_id: string){
    if(!user_id){
      throw new AppError("User not Found", 404, "USER_NOT_FOUND");
    }

    const patient = await this.patientRepository.findByUserId(user_id);


    if(patient){
      return await this.medicalRecordRepository.findByPatientId(patient.patient_id, medical_recod_id);
    }

    const doctor = await this.doctorRepository.findByUserId(user_id);

    if(doctor){
      return await this.medicalRecordRepository.findByDoctorId(doctor.doctor_id, medical_recod_id);
    }

    throw new AppError("Logged in user is not nghter patient nor doctor", 400, "NO_PATIENT_NOR_DOCTOR");
  }

  async getAllAppointment(query: any) {

    const {page, limit, skip} = getPagination(query);

    const search = query.search as string | undefined;

    const sort = query.sort as string | undefined;
    const order = (query.order as "ASC" | "DESC") || "ASC";

    const [medical_records, total] = await this.medicalRecordRepository.getAll(skip, limit, sort, order, search);

    return buildPagination(medical_records, total, page, limit)
  }
}
