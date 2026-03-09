import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";
import { AppError } from "../common/errors/AppError";
import { AppDataSource } from "../config/datasource";
import { UserRole } from "../entities/user_role.entities";

export const requireRole = (roleName: string) => {
   return async (req: AuthRequest, res: Response, next: NextFunction) => {

      const userId = req.user?.user_id;
      console.log(userId)
      if (!userId) {
         throw new AppError("Unauthorized",401,"UNAUTHORIZED");
      }

      const userRoleRepository = AppDataSource.getRepository(UserRole);

      const userRole = await userRoleRepository.findOne({
         where: {
            user: { user_id: userId },
            role: { role_name: roleName },
            is_active: true
         },
         relations: ["role"]
      });

      if (!userRole) {
         throw new AppError("Forbidden",403,"FORBIDDEN");
      }

      next();
   }
}