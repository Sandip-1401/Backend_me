import { CreatePrescriptionDto } from "./dto/createPrescriptionDto";
import { PrescriptionRepository } from "./prescription.repository";
import { AppDataSource } from "../../config/datasource";
import { Prescription } from "../../entities/prescription.entities";
import { PrescriptionMedicine } from "../../entities/prescription_medicine.entities";

export class PrescriptionService {

   private prescriptionRepository = new PrescriptionRepository();

   async createPrescription(data: CreatePrescriptionDto) {

      return await AppDataSource.transaction(async (manager) => {

         const prescriptionRepo = manager.getRepository(Prescription);
         const medicineRepo = manager.getRepository(PrescriptionMedicine);

         const prescription = await prescriptionRepo.save({
            medical_record: { medical_record_id: data.medical_record_id },
            doctor: { doctor_id: data.doctor_id },
            patient: { patient_id: data.patient_id },
            notes: data.notes
         });

         const medicines = data.medicines.map((medicine) => ({
            prescription: { prescription_id: prescription.prescription_id },
            medicine_name: medicine.medicine_name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration_days: medicine.duration_days
         }));

         await medicineRepo.save(medicines);

         return prescription;
      });
   };

   async getByMedicalRecord(medicalRecordId: string){
      const prescription = await this.prescriptionRepository.findByMedicalRecord(medicalRecordId);

      if(!prescription){
         throw new Error("Prescription not found");
      }

      return prescription;
   };

   async getByPatient(patientId: string){

      const prescriptions =
         await this.prescriptionRepository.findByPatient(patientId);

      if(!prescriptions || prescriptions.length === 0){
         throw new Error("No prescriptions found for this patient");
      }

      return prescriptions;
   };

   async getById(prescriptionId: string){

      const prescription =
         await this.prescriptionRepository.findById(prescriptionId);

      if(!prescription){
         throw new Error("Prescription not found");
      }

      return prescription;
   }
}