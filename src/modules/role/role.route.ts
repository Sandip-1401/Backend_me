import { Router } from 'express';
import RoleController from './role.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createRoleSchema } from './role.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const roleRoute = Router();
const roleController = new RoleController();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     description: Retrieve a list of all roles available in the system. Only users with the ADMIN role can access this endpoint.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access roles
 */

roleRoute.get('/', authMiddleware, requireRole(['ADMIN']), asyncHandler(roleController.getAllRole));

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create role
 *     description: Create a new role in the system. Only users with the ADMIN role are allowed to create roles.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Role details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_name:
 *                 type: string
 *                 description: Name of the role
 *                 example: DOCTOR
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can create roles
 */

roleRoute.post(
  '/',
  authMiddleware,
  requireRole(['ADMIN', 'SUPER ADMIN']),
  validate(createRoleSchema),
  asyncHandler(roleController.createRole),
);

export default roleRoute;
