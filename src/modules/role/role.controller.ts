import { successResponse } from '../../common/utils/successResponse';
import RoleService from './role.service';
import { Request, Response } from 'express';

export class RoleController {
  private roleService = new RoleService();

  createRole = async (req: Request, res: Response) => {
    const role = await this.roleService.createRole(req.body);

    return successResponse(res, 'Role created Successfully', role)
  };

  getAllRole = async (req: Request, res: Response) => {
    const roles = await this.roleService.getAllRole();
    return successResponse(res, 'Role fetched Successfully', roles)
  };
}
export default RoleController;
