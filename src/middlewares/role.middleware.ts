import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from '../common/errors/AppError';
import { AppDataSource } from '../config/datasource';
import { UserRole } from '../entities/user_role.entities';
import { In } from 'typeorm';

export const requireRole = (roles: string[]) => {

  const userRoleRepository = AppDataSource.getRepository(UserRole);
  
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.user_id;

    if (!userId) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const userRole = await userRoleRepository.findOne({
      where: {
        user: { user_id: userId },
        role: { role_name: In(roles) },
        is_active: true,
      },
    });

    if (!userRole) {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    }

    next();
  };
};
