import { Router } from 'express';
import { DepartmentController } from './department.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../common/utils/asyncHandler';

const departmentRoute = Router();

const deparmentController = new DepartmentController();

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     description: Retrieve a list of all departments in the system. Only users with the ADMIN role can access this endpoint.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Departments fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access departments
 */

departmentRoute.get(
  '/',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(deparmentController.getAll),
);

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     description: Retrieve details of a specific department using its ID. Only users with the ADMIN role can access this endpoint.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Department fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access department details
 *       404:
 *         description: Department not found
 */

departmentRoute.get(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(deparmentController.getById),
);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create department
 *     description: Create a new department in the system. Only users with the ADMIN role are allowed to create departments.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Department details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               department_name:
 *                 type: string
 *                 description: Name of the department
 *                 example: Cardiology
 *               description:
 *                 type: string
 *                 description: Description of the department
 *                 example: Department responsible for heart related treatments
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can create departments
 */

departmentRoute.post(
  '/',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(deparmentController.createDepartment),
);

/**
 * @swagger
 * /api/departments/{id}:
 *   patch:
 *     summary: Update department
 *     description: Update an existing department using its ID. Only users with the ADMIN role can update department details.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       description: Updated department details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               department_name:
 *                 type: string
 *                 description: Name of the department
 *                 example: Neurology
 *               description:
 *                 type: string
 *                 description: Description of the department
 *                 example: Department responsible for nervous system related treatments
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can update departments
 *       404:
 *         description: Department not found
 */

departmentRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(deparmentController.updateDepartment),
);

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete department
 *     description: Delete an existing department using its ID. Only users with the ADMIN role can delete departments.
 *     tags:
 *       - Departments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can delete departments
 *       404:
 *         description: Department not found
 */

departmentRoute.delete(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(deparmentController.deleteDepartment),
);

export default departmentRoute;
