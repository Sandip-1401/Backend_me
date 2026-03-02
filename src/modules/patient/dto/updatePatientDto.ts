export interface UpdatePatientDto{
   address_id?: string;
   blood_group?: string;
   date_of_birth?: Date;
   gender?: "MALE" | "FEMALE" | "OTHER";

   height?: number;
   weight?: number;

   status?: "ACTIVE" | "INACTIVE" | "DECEASED";
}