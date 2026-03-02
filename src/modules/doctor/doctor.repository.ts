import { AppDataSource } from "../../config/datasource";
import { Doctor } from "../../entities/doctor.entities";

export class DoctorRepository {
   private doctorRepository = AppDataSource.getRepository(Doctor);

   async createDoctor(data: Partial<Doctor>) {
      const doctor = this.doctorRepository.create(data);
      return this.doctorRepository.save(doctor);
   }

   async findByUserId(userId: string) {
      return this.doctorRepository.findOne({
         where: {
            user: { user_id: userId },
         },
         relations: ["user", "department", "address"],
      });
   }

   async findByDoctorId(doctorId: string) {
      return this.doctorRepository.findOne({
         where: { doctor_id: doctorId },
         relations: ["user", "department", "address"],
      });
   }

   async findAllDoctors() {
      return this.doctorRepository.find({
         relations: ["user", "address", "department"],
      });
   }

   async updateDoctor(doctorId: string, data: Partial<Doctor>) {
      return this.doctorRepository.update({ doctor_id: doctorId }, data);
   }

   async deleteDoctor(doctorId: string){
      return this.doctorRepository.delete(doctorId);
   }
}