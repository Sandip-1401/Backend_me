import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from '../common/errors/AppError';
import { AppDataSource } from '../config/datasource';
import { UserRole } from '../entities/user_role.entities';
import { In } from 'typeorm';
import { Role } from '../entities/roles.entities';

export const requireRole = (roles: string[]) => {
  const userRoleRepository = AppDataSource.getRepository(UserRole);
  const roleRepository = AppDataSource.getRepository(Role);

  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.user_id;
    console.log('UserID', userId);
    if (!userId) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const roleFound = await roleRepository.find({
      where: { role_name: In(roles) },
    });

    const roleIds = roleFound.map((role) => role.role_id);
    // console.log(roleIds);
    const userRole = await userRoleRepository.findOne({
      where: {
        user: { user_id: userId },
        role: { role_id: In(roleIds) },
        is_active: true,
      },
    });
    console.log(userRole);
    if (!userRole) {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    }

    next();
  };
};
