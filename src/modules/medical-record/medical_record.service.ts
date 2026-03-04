import { AppError } from "../../common/errors/AppError";
import { CreateMedicalRecordDto } from "./dto/createMedicalRecordDto";
import { MedicalRecordRepository } from "./medical-record.repository";

export class MedicalRecordService{
   private medicalRecordRepository = new MedicalRecordRepository();

   async createRecord(data: CreateMedicalRecordDto){
      const existingRecord = await this.medicalRecordRepository.findByAppointment(data.appointment_id);

      if (existingRecord) throw new AppError("Medical record already exists for this appointment", 409, "MEDICAL_RECORD_ALREADY_EXISTS");

      const record = await this.medicalRecordRepository.createRecord({
         patient: {patient_id: data.patient_id} as any,
         doctor: { doctor_id: data.doctor_id } as any,
         appointment: { appointment_id: data.appointment_id } as any,
         diagnosis: data.diagnosis,
         notes: data.notes
      });
      return record;
   };

   async getAppointmentRecord(appointmentId: string){
      const record = await this.medicalRecordRepository.findByAppointment(appointmentId);
      if (!record) throw new AppError("No records found for this appointment", 404, "MEDICAL_RECORD_NOT_FOUND");
      return record;
   }

   async getPatientRecords(patientId: string){
      const record = await this.medicalRecordRepository.findByPatient(patientId);
      if (!record || record.length === 0) throw new AppError("No records found for this patient", 404, "PATIENT_MEDICAL_RECORDS_NOT_FOUND");

      return record;
   };

   async getDoctorRecords(doctorId: string){
      const record = await this.medicalRecordRepository.findByDoctor(doctorId);
      if (!record || record.length === 0) throw new AppError("No records found for this doctor", 404, "DOCTOR_MEDICAL_RECORDS_NOT_FOUND");
      return record;
   };

   async getAllAppointment(){
      const records = await this.medicalRecordRepository.getAll();
      return records;
   }
}