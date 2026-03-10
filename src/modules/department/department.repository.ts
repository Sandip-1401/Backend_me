import { AppDataSource } from "../../config/datasource";
import { Department } from "../../entities/department.entities";
import { User } from "../../entities/user.entities";
export class DepartmentRepository{
   private departmentRepository = AppDataSource.getRepository(Department);
   private userRepository = AppDataSource.getRepository(User);

   async createDepartment(data: Partial<Department>){
      const deparment = this.departmentRepository.create(data);
      return await this.departmentRepository.save(deparment);
   }

   async getAll(){
      return await this.departmentRepository.find();
   }

   async getById(department_id: string){
      return await this.departmentRepository.findOne({
         where: {department_id: department_id}
      })
   }

   async updateDepartment(departmentId: string, data: Partial<Department>){
      return await this.departmentRepository.update(departmentId, data);
   }

   async deleteDeparment(departmentId: string){
      return await this.departmentRepository.delete(departmentId);
   }

   async findUser(userId: string){
      return await this.userRepository.findOne({
         where: {user_id: userId}
      })
   }
}