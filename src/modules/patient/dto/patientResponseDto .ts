export interface PatientResponseDto {
  patient_id: string;

  user_id: string;
  address_id?: string;

  blood_group?: string;
  date_of_birth?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";

  height?: number;
  weight?: number;

  status: "ACTIVE" | "INACTIVE" | "DECEASED";

  created_at: Date;
  updated_at: Date;
}