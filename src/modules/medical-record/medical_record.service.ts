import { AppError } from "../../common/errors/AppError";
import { AppointmentStatusName } from "../../entities/appointment_status.entities";
import { AppointmentRepository } from "../appointment/appointment.repository";
import { CreateMedicalRecordDto } from "./dto/createMedicalRecordDto";
import { MedicalRecordRepository } from "./medical-record.repository";

export class MedicalRecordService {
   private medicalRecordRepository = new MedicalRecordRepository();
   private appointmentRepository = new AppointmentRepository();
   async createRecord(data: CreateMedicalRecordDto) {

      const appointment = await this.appointmentRepository.findById(data.appointment_id);

      if (!appointment) {
         throw new AppError("Appointment not found", 404, "APPOINTMENT_NOT_FOUND");
      }

      const existingRecord =
         await this.medicalRecordRepository.findByAppointment(data.appointment_id);

      if (existingRecord) {
         throw new AppError("Medical record already exists for this appointment", 409, "MEDICAL_RECORD_ALREADY_EXISTS");
      }

      if (appointment.status.status_name !== AppointmentStatusName.COMPLETED) {
         throw new AppError("Medical record can only be created after appointment is completed", 400, "APPOINTMENT_NOT_COMPLETED");
      }

      const record = await this.medicalRecordRepository.createRecord({
         patient: appointment.patient,
         doctor: appointment.doctor,
         appointment: appointment,
         diagnosis: data.diagnosis,
         notes: data.notes
      });

      return record;
   }

   async getAppointmentRecord(appointmentId: string) {
      const record = await this.medicalRecordRepository.findByAppointment(appointmentId);
      if (!record) throw new AppError("No records found for this appointment", 404, "MEDICAL_RECORD_NOT_FOUND");
      return record;
   }

   async getPatientRecords(patientId: string) {
      const record = await this.medicalRecordRepository.findByPatient(patientId);
      if (!record || record.length === 0) throw new AppError("No records found for this patient", 404, "PATIENT_MEDICAL_RECORDS_NOT_FOUND");

      return record;
   };

   async getDoctorRecords(doctorId: string) {
      const record = await this.medicalRecordRepository.findByDoctor(doctorId);
      if (!record || record.length === 0) throw new AppError("No records found for this doctor", 404, "DOCTOR_MEDICAL_RECORDS_NOT_FOUND");
      return record;
   };

   async getAllAppointment() {
      const records = await this.medicalRecordRepository.getAll();
      return records;
   }
}