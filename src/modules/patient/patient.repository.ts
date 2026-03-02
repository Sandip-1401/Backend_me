import { AppDataSource } from "../../config/datasource";
import { Address } from "../../entities/address.entities";
import { Gender, Patient, PatientStatus } from "../../entities/patient.entities";
import { User } from "../../entities/user.entities";
import { CreatePatientDto } from "./dto/createPatientDto";
import { UpdatePatientDto } from "./dto/updatePatientDto";

export class PatientRepository{
   private patientRepository = AppDataSource.getRepository(Patient);

   async createPatient(data: CreatePatientDto){
      
      const patient = this.patientRepository.create({
         blood_group: data.blood_group,
         date_of_birth: data.date_of_birth,
         gender: data.gender,
         height: data.height,
         weight: data.weight,

         user: {user_id: data.user_id} as User,

         address: data.address_id ? ({address_id: data.address_id} as Address) : undefined
      });
      return this.patientRepository.save(patient)
   }

   async findById(patientId: string){
      return this.patientRepository.findOne({
         where: {patient_id: patientId},
         relations: ["user", "address"]
      })
   }

   async findAllPatient(){
      return this.patientRepository.find({
         relations: ["user", "address"]
      });
   }

   async findByUserId(userId: string){
      return this.patientRepository.findOne({
         where: {
            user : {user_id: userId},
         },
         relations: ["user", "address"]
      })
   }

   async updatePatient(patientId: string, data: UpdatePatientDto){
      return this.patientRepository.update(patientId, {
         blood_group: data.blood_group,
         date_of_birth: data.date_of_birth,
         gender: data.gender as Gender,
         height: data.height,
         weight: data.weight,
         status: data.status as PatientStatus,

         ...(data.address_id && {address: {address_id: data.address_id} as any})
      })
   };

   async deletePatient(patientId: string){
      return this.patientRepository.softDelete(patientId);
   }
}

export default PatientRepository