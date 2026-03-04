export interface CreateMedicalRecordDto{
   patient_id: string,
   doctor_id: string,
   appointment_id: string,
   diagnosis: string,
   notes?: string,
}