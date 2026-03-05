import { ILike } from "typeorm";
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

   async findAllDoctors(skip: number, limit: number, departmentId?: string, sort?: string, order: "ASC" | "DESC" = "ASC", search?: string): Promise<[Doctor[], number]>  {

      const query = this.doctorRepository
         .createQueryBuilder("doctor")
         .leftJoinAndSelect("doctor.user", "user")
         .leftJoinAndSelect("doctor.department", "department")
         .leftJoinAndSelect("doctor.address", "address");

      if (departmentId) {
         query.andWhere("department.department_id = :departmentId", {
            departmentId
         });
      }

      if (search) {
         query.andWhere("doctor.qualification ILIKE :search", {
            search: `%${search}%`
         });
      }

      if (sort) {
         query.orderBy(`doctor.${sort}`, order);
      }

      query.skip(skip).take(limit);

      const [doctors, total] = await query.getManyAndCount();

      return [doctors, total];
   }

   async updateDoctor(doctorId: string, data: Partial<Doctor>) {
      return this.doctorRepository.update({ doctor_id: doctorId }, data);
   }

   async deleteDoctor(doctorId: string) {
      return this.doctorRepository.delete(doctorId);
   }
}