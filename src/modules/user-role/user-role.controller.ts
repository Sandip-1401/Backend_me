import { UserRoleService } from "./user-role.service";
import { Request, Response } from "express";

export class UserRoleController {
   private userRoleService = new UserRoleService();

   assignRoleToUser = async (req: Request, res: Response) => {
      const { userId, roleId, assignedByUserId } = req.body;

      const userRole = this.userRoleService.assignRoleToUser(userId, roleId, assignedByUserId);

      return res.status(201).json({
         success: true,
         message: "Role assigned to user Successfully",
         data: userRole
      })
   };

   getUserRole = async (req: Request, res: Response) => {
      const { userId } = req.params;
      const userRoles = await this.userRoleService.getRolesByUser(String(userId));
      return res.status(200).json({
         success: true,
         data: userRoles
      })
   }

   revokeUserRole = async (req: Request, res: Response) => {

      const { userId, roleId } = req.body;

      await this.userRoleService.revokeRole(userId, roleId);
      return res.status(200).json({
         success: true,
         message: "Role revoked successfully",
      })

   }
}