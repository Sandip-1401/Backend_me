import { AppDataSource } from "../../config/datasource";
import { MedicalRecord } from "../../entities/medical_records.entities";

export class MedicalRecordRepository{
   private medicalRecordRepository = AppDataSource.getRepository(MedicalRecord);

   async createRecord(data: Partial<MedicalRecord>){
      const record = this.medicalRecordRepository.create(data);
      return await this.medicalRecordRepository.save(record);
   };

   async findByAppointment(appointmentId: string){
      return this.medicalRecordRepository.findOne({
         where: { appointment: {appointment_id: appointmentId} },
         relations: {
            appointment: true,
            doctor: true,
            patient: true
         },
         order: { record_date: "DESC" }
      })
   };

   async findByPatient(patientId: string){
      return this.medicalRecordRepository.find({
         where: { patient: {patient_id: patientId} },
         relations: {
            appointment: true,
            doctor: true,
            patient: true
         },
         order: { record_date: "DESC" }
      })
   };

   async findByDoctor(doctorId: string){
      return this.medicalRecordRepository.find({
         where: { doctor: {doctor_id: doctorId} },
         relations: {
            appointment: true,
            doctor: true,
            patient: true
         },
         order: { record_date: "DESC" }
      })
   };

   async getAll(){
      return this.medicalRecordRepository.find({
         relations: {
            appointment: true,
            doctor: true,
            patient: true
         }
      })
   }

}