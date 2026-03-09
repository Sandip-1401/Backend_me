import { AppError } from "../../common/errors/AppError";
import { DoctorStatus } from "../../entities/doctor.entities";
import { AdminRepository } from "./admin.repository";

export class AdminService{
   private adminRepository = new AdminRepository();

   async getPendingDoctors(){
      const doctors = await this.adminRepository.findPendigDoctor();
      
      if(doctors.length <= 0){
         throw new AppError("No Pending Doctor not found", 404, "PENDING_DOCTOR_NOT_FOUND")
      }
      return doctors;
   };

   async activeDoctorById(doctorId: string){
      const doctor = await this.adminRepository.findPendingDoctorById(doctorId);

      if(!doctor) throw new AppError("Doctor not found", 404, "DOCTOR_NOT_FOUND");
      
      return await this.adminRepository.activeDoctor(doctorId, {status: DoctorStatus.ACTIVE});
   }

   async getUnverifiedUser(){
      return await this.adminRepository.findUnverifiedUser();
   }

   async verifiedUserById(userId: string){
      const user = await this.adminRepository.findUnverifiedUserById(userId);
      if(user && user.is_verified){
         throw new AppError("User already verified", 404, "USER_ALREADY_VERIFIED");
      };
      
      return await this.adminRepository.verifiedUserById(userId, {is_verified: true});

   }
}