import RoleService from './role.service';
import { Request, Response } from 'express';

export class RoleController {
  private roleService = new RoleService();

  createRole = async (req: Request, res: Response) => {
    const role = await this.roleService.createRole(req.body);

    return res.status(201).json({
      success: true,
      message: 'Role created Successfully',
      data: role,
    });
  };

  getAllRole = async (req: Request, res: Response) => {
    const roles = await this.roleService.getAllRole();

    return res.status(200).json({
      success: true,
      data: roles,
    });
  };
}
export default RoleController;
