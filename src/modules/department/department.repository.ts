import { applyFilter, applyPagination, applySearch, applySorting } from "../../common/utils/FSSP/fssp.util";
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

   async getAll(
       skip: number, 
         limit: number, 
         department?: string,
         sort?: string, 
         order: "ASC" | "DESC" = "ASC", 
         search?: string
   ): Promise<[Department[], number]>{

      const query = await this.departmentRepository
         .createQueryBuilder("department");
      
      // applyFilter(query, )
      applySearch(query, ["department_name", "description"], search);

      const allowedSortFields = ["created_at"];

      applySorting(query, "department", sort, order, allowedSortFields);
      applyPagination(query, skip, limit);

      const [departments, total] = await query.getManyAndCount();

      return [departments, total];
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