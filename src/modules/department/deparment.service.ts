import { AppError } from "../../common/errors/AppError";
import { buildPagination } from "../../utils/pagination-response.util";
import { getPagination } from "../../utils/pagination.util";
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
   };

   async getAll(query: any){

      const {page, limit, skip} = getPagination(query);
      
          const department = query.department as string | undefined;
      
          const sort = query.sort as string | undefined;
          const order = (query.order as "ASC" | "DESC") || "ASC";
      
          const search = query.search as string | undefined;
      
      const [departments, total] = await this.departmentRepository.getAll(skip, limit, department, sort, order, search);

      if(departments.length = 0){
         throw new AppError('Department not found', 404, 'DEPARTMENT_NOT_FOUND');
      }

      return buildPagination(department, total, page, limit)
   }

   async getById(department_id: string){
      return await this.departmentRepository.getById(department_id);
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