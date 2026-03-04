import { CreatePrescriptionMedicineDto } from "./createPrescriptionMedicineDto";

export interface CreatePrescriptionDto {
   medical_record_id: string,
   doctor_id: string,
   patient_id: string,
   notes?: string,
   medicines: CreatePrescriptionMedicineDto[],
}