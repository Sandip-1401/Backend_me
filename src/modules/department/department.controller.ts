import { successResponse } from "../../common/utils/successResponse";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { DepartmentService } from "./deparment.service";
import { Response } from "express";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./department.dto";
export class DepartmentController{
   private departmentService = new DepartmentService();

   createDepartment = async (req: AuthRequest, res: Response) => {
      const data: CreateDepartmentDto = req.body;
      const userId = String(req.user?.user_id);
      const deparment = await this.departmentService.createDepartment(userId, data);

      return successResponse(res, "Department created successfully", deparment)
   };

   updateDepartment = async (req: AuthRequest, res: Response) => {
      const data: UpdateDepartmentDto = req.body;
      const userId = String(req.user?.user_id);
      const department_id = String(req.params.id);
      const depertment = await this.departmentService.updateDeparment(userId, department_id, data);

      return successResponse(res, "Department updated successfully", depertment)
   };

   deleteDepartment = async (req: AuthRequest, res: Response) => {
      const department_id = String(req.params.id);
      const depertment = await this.departmentService.deleteDepartment(department_id);

      return successResponse(res, "Department deleted successfully", depertment)
   }
}