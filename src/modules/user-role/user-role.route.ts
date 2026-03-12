import { Router } from 'express';
import { UserRoleController } from './user-role.controller';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';

const userRoleRoute = Router();

const userRoleController = new UserRoleController();

/**
 * @swagger
 * /api/user-roles/{userId}:
 *   get:
 *     summary: Get user roles
 *     description: Retrieve all roles assigned to a specific user using the user ID. Only users with the ADMIN role can access this endpoint.
 *     tags:
 *       - User Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User roles fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access user roles
 *       404:
 *         description: User not found or roles not assigned
 */

userRoleRoute.get(
  '/:userId',
  authMiddleware,
  requireRole(['ADMIN', 'SUPER ADMIN']),
  asyncHandler(userRoleController.getUserRole),
);

/**
 * @swagger
 * /api/user-roles/assign:
 *   post:
 *     summary: Assign role to user
 *     description: Assign a role to a specific user. Only users with the ADMIN role can perform this action.
 *     tags:
 *       - User Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: User and role information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: 1151a2c6-63e5-487e-a7ab-36d121adfba1
 *               role_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the role to assign
 *                 example: 9726439c-57fa-4cc4-92b5-c783b0c9d8a9
 *     responses:
 *       201:
 *         description: Role assigned to user successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can assign roles
 *       404:
 *         description: User or role not found
 */

userRoleRoute.post(
  '/assign',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(userRoleController.assignRoleToUser),
);

/**
 * @swagger
 * /api/user-roles/revoke:
 *   delete:
 *     summary: Revoke user role
 *     description: Revoke a role assigned to a user. Only users with the ADMIN role can perform this action.
 *     tags:
 *       - User Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: User and role information to revoke
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: 1151a2c6-63e5-487e-a7ab-36d121adfba1
 *               role_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the role to revoke
 *                 example: 9726439c-57fa-4cc4-92b5-c783b0c9d8a9
 *     responses:
 *       200:
 *         description: Role revoked from user successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can revoke roles
 *       404:
 *         description: User or role not found
 */

userRoleRoute.delete(
  '/revoke',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(userRoleController.deleteUserRole),
);

export default userRoleRoute;
