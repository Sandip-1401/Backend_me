import { Router } from 'express';
import RoleController from './role.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createRoleSchema } from './role.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';

const roleRoute = Router();
const roleController = new RoleController();

roleRoute.get('/', asyncHandler(roleController.getAllRole));
roleRoute.post('/', validate(createRoleSchema), asyncHandler(roleController.createRole));

export default roleRoute;
