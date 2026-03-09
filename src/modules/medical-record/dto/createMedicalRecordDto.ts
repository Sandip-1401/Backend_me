export interface CreateMedicalRecordDto {
  appointment_id: string;
  diagnosis: string;
  notes?: string;
}
