import { CreateMedicalRecordDto } from "./dto/createMedicalRecordDto";
import { MedicalRecordRepository } from "./medical-record.repository";

export class MedicalRecordService{
   private medicalRecordRepository = new MedicalRecordRepository();

   async createRecord(data: CreateMedicalRecordDto){
      const existingRecord = await this.medicalRecordRepository.findByAppointment(data.appointment_id);

      if(existingRecord) throw new Error("Medical Record already exists for this Appointment");

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
      if(!record) throw new Error("No recors found for this appointment")
      return record;
   }

   async getPatientRecords(patientId: string){
      const record = await this.medicalRecordRepository.findByPatient(patientId);
      if(!record ||record.length === 0) throw new Error("No recors found for this Patient");

      return record;
   };

   async getDoctorRecords(doctorId: string){
      const record = await this.medicalRecordRepository.findByDoctor(doctorId);
      if(!record || record.length === 0) throw new Error("no records found fot this doctor");
      return record;
   };

   async getAllAppointment(){
      const records = await this.medicalRecordRepository.getAll();
      return records;
   }
}