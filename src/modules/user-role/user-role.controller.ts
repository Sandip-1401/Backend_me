import { UserRoleService } from "./user-role.service";
import { Request, Response } from "express";

export class UserRoleController{
   private userRoleService = new UserRoleService();

   assignRoleToUser = async (req: Request, res: Response) => {
      try{
         const {userId, roleId, assignedByUserId} = req.body;

         const userRole = this.userRoleService.assignRoleToUser(userId, roleId, assignedByUserId);

         return res.status(201).json({
            success: true,
            message: "Role assigned to user Successfully",
            data: userRole
         })
      }catch(err: any){
         res.status(201).json({
            success: false,
            message: err.message
         })
      }
   };

   getUserRole = async (req: Request, res: Response) => {
      try{
         const {userId} = req.params;
         const userRoles = await this.userRoleService.getRolesByUser(String(userId));
         return res.status(200).json({
            success: true,
            data: userRoles
         })
      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message
         });
      }
   }

   revokeUserRole = async (req: Request, res: Response) => {
      try{

         const {userId, roleId} = req.body;

         await this.userRoleService.revokeRole(userId, roleId);
         return res.status(200).json({
            success: true,
            message: "Role revoked successfully",
         })

      }catch(err: any){
         return res.status(400).json({
            success: false,
            message: err.message || "Failed to revoke role",
         });
      }
   }
}