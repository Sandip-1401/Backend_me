import { successResponse } from '../../common/utils/successResponse';
import { UserRoleService } from './user-role.service';
import { Request, Response } from 'express';

export class UserRoleController {
  private userRoleService = new UserRoleService();

  assignRoleToUser = async (req: Request, res: Response) => {
    const { userId, roleId, assignedByUserId } = req.body;

    const userRole = await this.userRoleService.assignRoleToUser(userId, roleId, assignedByUserId);

    return successResponse(res, 'Role assigned to user Successfully', userRole)
   
  };

  getUserRole = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userRoles = await this.userRoleService.getRolesByUser(String(userId));
    return successResponse(res, 'User role fetched Successfully', userRoles)
  };

  revokeUserRole = async (req: Request, res: Response) => {
    const { userId, roleId } = req.body;

    await this.userRoleService.revokeRole(userId, roleId);
    return successResponse(res, 'Role revoked successfully')
  };
}
