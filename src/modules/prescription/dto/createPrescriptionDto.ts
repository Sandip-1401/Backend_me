import { CreatePrescriptionMedicineDto } from "./createPrescriptionMedicineDto";

export interface CreatePrescriptionDto {
   medical_record_id: string,
   notes?: string,
   medicines: CreatePrescriptionMedicineDto[],
}