import { Router } from 'express';
import { UserRoleController } from './user-role.controller';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';

const userRoleRoute = Router();

const userRoleController = new UserRoleController();

userRoleRoute.get('/:userId', authMiddleware,  requireRole(["ADMIN"]), asyncHandler(userRoleController.getUserRole));
userRoleRoute.post('/assign', authMiddleware,  requireRole(["ADMIN"]), asyncHandler(userRoleController.assignRoleToUser));
userRoleRoute.delete('/revoke', authMiddleware,  requireRole(["ADMIN"]), asyncHandler(userRoleController.revokeUserRole));

export default userRoleRoute;
