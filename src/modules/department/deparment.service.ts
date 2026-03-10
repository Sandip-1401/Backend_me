import { CreateDepartmentDto, UpdateDepartmentDto } from "./department.dto";
import { DepartmentRepository } from "./department.repository";

export class DepartmentService{
   private departmentRepository = new DepartmentRepository();
   
   async createDepartment(userId: string, data: CreateDepartmentDto) {

   const user = await this.departmentRepository.findUser(userId);

   if(!user){
      throw new Error("User not found");
   }

   const department = await this.departmentRepository.createDepartment({
      ...data,
      created_by: user
   });

   return department;
}

   async updateDeparment(userId: string, department_id: string, data: UpdateDepartmentDto){

      const user = await this.departmentRepository.findUser(userId);

      if(!user){
         throw new Error("User not found");
      }

      const department = await this.departmentRepository.updateDepartment(department_id,{
         ...data,
         updated_by: user
      });

      return department;

   }

   async deleteDepartment(department_id: string){
      return await this.departmentRepository.deleteDeparment(department_id);
   }
}