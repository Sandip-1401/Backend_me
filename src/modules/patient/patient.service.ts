import { AppDataSource } from "../../config/datasource";
import { Role } from "../../entities/roles.entities";
import { User } from "../../entities/user.entities";
import { UserRole } from "../../entities/user_role.entities";
import UserRoleRepository from "../user-role/user_role.repository";
import { CreatePatientDto } from "./dto/createPatientDto";
import { UpdatePatientDto } from "./dto/updatePatientDto";
import PatientRepository from "./patient.repository";

export class PatientService{
   private patientRepository = new PatientRepository();
   private userRepositoy = AppDataSource.getRepository(User);
   private roleRepository = AppDataSource.getRepository(Role);
   private userRoleRepository = new UserRoleRepository();
   // private userRoleRepository = AppDataSource.getRepository(UserRole);

   async createPatient(data: CreatePatientDto){
       const user = await this.userRepositoy.findOne({
         where: {user_id: data.user_id}
      })
      
      if(!user){
         throw new Error("User not found")
      }

      const existsPatient = await this.patientRepository.findByUserId(data.user_id);

      if(existsPatient){
         throw new Error("Patient already exists")
      }

      const patient = await this.patientRepository.createPatient(data);

      const patientRole = await this.roleRepository.findOne({
         where: {role_name: "PATIENT"}
      });

      if(!patientRole){ 
         throw new Error("Patient role not found")
      }

      await this.userRoleRepository.assignRole(user, patientRole);

      return patient;
   };

   async findPatientById(patientId: string){
      const patient = await this.patientRepository.findById(patientId);
      if(!patient){
         throw new Error("Patient not found")
      }
      return patient;
   };

   async findAllPatient(){
      return this.patientRepository.findAllPatient();
   };

   async findPatientByUserId(userId: string){
      const patient = await this.patientRepository.findByUserId(userId)
      if(!patient){
         throw new Error("Patient not found")
      }
      return patient;
   };

   async updatePatient(patientId: string, data: UpdatePatientDto){
      const patient = await this.patientRepository.updatePatient(patientId, data);

      if(patient.affected === 0){
         throw new Error("Patient not found or not updated")
      }
      return true;
   };

   async deletePatient(patientId: string){
      const result = await this.patientRepository.deletePatient(patientId);

      if (!result.affected) {
         throw new Error("Patient not found");
      }

      return true;
   }
}