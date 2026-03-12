import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { UserRoleService } from './user-role.service';
import { Request, Response } from 'express';

export class UserRoleController {
  private userRoleService = new UserRoleService();

  assignRoleToUser = async (req: AuthRequest, res: Response) => {
    const { userId, roleId, assignedByUserId } = req.body;

    const userRole = await this.userRoleService.assignRoleToUser(userId, roleId, assignedByUserId);

    return successResponse(res, 'Role assigned to user Successfully', userRole);
  };

  getUserRole = async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    const userRoles = await this.userRoleService.getRolesByUser(String(userId));
    return successResponse(res, 'User role fetched Successfully', userRoles);
  };

  deleteUserRole = async (req: AuthRequest, res: Response) => {
    const { userId, roleId } = req.body;

    await this.userRoleService.deleteRole(userId, roleId);

    return successResponse(res, 'Role deleted successfully');
  };
}
