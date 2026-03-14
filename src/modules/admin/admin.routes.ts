import { Router } from 'express';
import { AdminController } from './admin.controller';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';

const adminRoute = Router();

const adminController = new AdminController();

/**
 * @swagger
 * /api/admin/pending-doctors:
 *   get:
 *     summary: Get pending doctors
 *     description: Retrieve a list of doctors whose accounts are pending approval. Only users with the ADMIN role can access this endpoint.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending doctors fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access pending doctors
 */

adminRoute.get(
  '/pending-doctors',
  authMiddleware,
  requireRole(['ADMIN', 'SUPER ADMIN']),
  asyncHandler(adminController.getPendingDoctors), //FSSP done
);

/**
 * @swagger
 * /api/admin/active-doctor/{id}:
 *   patch:
 *     summary: Activate doctor
 *     description: Activate a doctor account by ID. Only users with the ADMIN role are allowed to perform this action.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor activated successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can activate doctors
 *       404:
 *         description: Doctor not found
 */

adminRoute.patch(
  '/active-doctor/:id',
  authMiddleware,
  requireRole(['ADMIN', 'SUPER ADMIN']),
  asyncHandler(adminController.activedoctorById),
);

/**
 * @swagger
 * /api/admin/unverified-users:
 *   get:
 *     summary: Get unverified users
 *     description: Retrieve a list of users whose accounts are not yet verified. Only users with the ADMIN role can access this endpoint.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unverified users fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access unverified users
 */

adminRoute.get(
  '/unverified-users',
  authMiddleware,
  requireRole(['ADMIN', 'SUPER ADMIN']),
  asyncHandler(adminController.unverifiedUser), //FSSP done
);

/**
 * @swagger
 * /api/admin/verify-user/{id}:
 *   patch:
 *     summary: Verify user
 *     description: Verify a user account by ID. Only users with the ADMIN role are allowed to verify users.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User verified successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can verify users
 *       404:
 *         description: User not found
 */

adminRoute.patch(
  '/verify-user/:id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(adminController.verifyUserById),
);

export default adminRoute;
