import RoleService from "./role.service";
import { Request, Response } from "express";

export class RoleController{
   private roleService = new RoleService();

   createRole = async (req: Request, res: Response) => {
      try{
         const role = await this.roleService.createRole(req.body);

         return res.status(201).json({
            success: true,
            message: "Role created Successfully",
            data: role
         })
      }catch(err: any){
         res.status(400).json({
            success: false,
            message: err.message
         })
      }
   };

   getAllRole = async(req: Request, res: Response) => {
      try{
         const roles = await this.roleService.getAllRole();

         return res.status(200).json({
            success: true,
            data: roles
         })
      }catch(err: any){
         res.status(500).json({
            success: err.message
         })
      }
   }
}
export default RoleController;