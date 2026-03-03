import { NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { AppDataSource } from "../config/datasource";
import { UserRole } from "../entities/user_role.entities";

export const requireRole = (roleName: string) => {
   return async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = req.user?.user_id;

      if (!userId) throw new Error("Unauthorized")

      const userRoleRepository = AppDataSource.getRepository(UserRole);

      const userRole = await userRoleRepository.findOne({
         where: {
            user: { user_id: userId },
            role: { role_name: roleName },
            is_active: true
         },
         relations: ["user", "role"]
      });

      if (!userRole) throw new Error("Forbidden...your role is not that you can access")

      next();
   }
}
