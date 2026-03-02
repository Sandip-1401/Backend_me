import { Gender } from "../../../entities/patient.entities";

export interface CreatePatientDto {
   user_id: string,
   address_id?: string;
   blood_group?: string;
   date_of_birth?: Date;
   gender?: Gender;
   height?: number;
   weight?: number;
}