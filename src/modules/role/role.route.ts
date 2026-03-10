import { Router } from 'express';
import RoleController from './role.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createRoleSchema } from './role.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const roleRoute = Router();
const roleController = new RoleController();

roleRoute.get('/', authMiddleware, requireRole(["ADMIN"]), asyncHandler(roleController.getAllRole));
roleRoute.post('/', validate(createRoleSchema), requireRole(["ADMIN"]), asyncHandler(roleController.createRole));

export default roleRoute;
