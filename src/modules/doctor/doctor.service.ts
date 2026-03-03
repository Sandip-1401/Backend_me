import { AppError } from "../../common/errors/AppError";
import { AppDataSource } from "../../config/datasource";
import { Address } from "../../entities/address.entities";
import { Department } from "../../entities/department.entities";
import { Doctor, DoctorStatus } from "../../entities/doctor.entities";
import { User } from "../../entities/user.entities";
import { DoctorRepository } from "./doctor.repository";


const ALLOWED_UPDATE_FIELDS = [
   "qualification",
   "experience_years",
   "consultation_fee",
   "is_available",
   "status",
] as const;

type AllowedUpdateData = Pick<Doctor, (typeof ALLOWED_UPDATE_FIELDS)[number]>;

export class DoctorService {
   private doctorRepository = new DoctorRepository();
   private userRepository = AppDataSource.getRepository(User);
   private addressRepository = AppDataSource.getRepository(Address);
   private departmentRepository = AppDataSource.getRepository(Department);

   async createDoctor(
      user_id: string,
      payload: {
         department_id: string;
         qualification: string;
         experience_years: number;
         consultation_fee?: number;
         address_id?: string;
      }
   ) {
      
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) throw new Error("User not found");

      
      const existingDoctor = await this.doctorRepository.findByUserId(user_id);
      if (existingDoctor) throw new Error("Doctor already exists");

      
      const department = await this.departmentRepository.findOne({
         where: { department_id: payload.department_id },
      });
      if (!department) throw new Error("Department not found");

      
      let address: Address | null = null;
      if (payload.address_id) {
         address = await this.addressRepository.findOne({
            where: { address_id: payload.address_id },
         });
         if (!address) throw new Error("Address not found");
      }

      const doctorData: Partial<Doctor> = {
         user,
         department,
         qualification: payload.qualification,
         experience_years: payload.experience_years,
         consultation_fee: payload.consultation_fee,
         address: address ?? undefined,
         status: DoctorStatus.ACTIVE,
         is_available: true,
      };

      return await this.doctorRepository.createDoctor(doctorData);
   }
   
   async getDoctorByUserId(userId: string) {
      const doctor = await this.doctorRepository.findByUserId(userId);
      if (!doctor) throw new Error("Doctor profile not found");
      return doctor;
   }

   
   async getDoctorById(doctorId: string) {
      const doctor = await this.doctorRepository.findByDoctorId(doctorId);
      // if (!doctor) throw new Error("Doctor not found");
      if(!doctor) throw new AppError("Doctor not found", 404, "DOCTOR_NOT_FOUND");
      return doctor;
   }

   async getAllDoctors() {
      return await this.doctorRepository.findAllDoctors();
   }

   async updateDoctorById(doctorId: string, data: Partial<Doctor>) {
      
      const doctor = await this.doctorRepository.findByDoctorId(doctorId);
      if (!doctor) throw new Error("Doctor not found");

      const filteredData = Object.fromEntries(
         Object.entries(data).filter(([key]) =>
            (ALLOWED_UPDATE_FIELDS as readonly string[]).includes(key)
         )
      ) as Partial<AllowedUpdateData>;

      if (Object.keys(filteredData).length === 0) {
         throw new Error("No valid fields provided to update");
      }

      const result = await this.doctorRepository.updateDoctor(
         doctor.doctor_id,
         filteredData
      );

      if (result.affected === 0) throw new Error("Update failed");

      return result;
   };


   async deleteDoctor(doctorId: string){
      const doctor = await this.doctorRepository.findByDoctorId(doctorId);
      if(!doctor){
         throw new Error("Doctor not found")
      }
      return await this.doctorRepository.deleteDoctor(doctorId);
   }
}