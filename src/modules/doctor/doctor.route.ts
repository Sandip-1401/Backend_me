import { Router } from 'express';
import { DoctorController } from './doctor.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createDoctorSchema, updateDoctorSchema } from './doctor.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const doctorRoute = Router();
const doctorController = new DoctorController();

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Fetch a paginated list of doctors with optional filtering, sorting, and search functionality.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         required: false
 *         description: Number of records to skip for pagination
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of records to return
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: departmentId
 *         required: false
 *         description: Filter doctors by department ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search doctors by name or qualification
 *         schema:
 *           type: string
 *           example: cardiologist
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Field to sort by (allowed values experience_years or created_at)
 *         schema:
 *           type: string
 *           example: experience_years
 *       - in: query
 *         name: order
 *         required: false
 *         description: Sort order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: DESC
 *     responses:
 *       200:
 *         description: Successfully retrieved doctors
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

doctorRoute.get(
  '/',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(doctorController.getAllDoctors),
);

/**
 * @swagger
 * /api/doctors/my-profile:
 *  get:
 *    summary: Get logged-in doctor's profile
 *    description: Returns profile information of the logged-in doctor
 *    tags:
 *      - Doctors
 *    security:
 *      - bearerAuth: []
 *    responses:
 *       200:
 *         description: Doctor profile fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
doctorRoute.get(
  '/my-profile',
  authMiddleware,
  requireRole(['DOCTOR']),
  asyncHandler(doctorController.getMyProfile),
);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     description: Fetch a doctor by their ID
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */

doctorRoute.get(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  doctorController.getDoctorById,
);

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a doctor
 *     description: Create a new doctor profile
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example:
 *               department_id:
 *                 type: string
 *                 example:
 *               qualification:
 *                 type: string
 *                 example:
 *               experience_years:
 *                 type: number
 *                 example:
 *               consultation_fee:
 *                 type: number
 *                 example:
 *               address_id:
 *                 type: string
 *                 example:
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

doctorRoute.post(
  '/',
  authMiddleware,
  // requireRole(["DOCTOR"]),
  validate(createDoctorSchema),
  asyncHandler(doctorController.createDoctor),
);

/**
 * @swagger
 * /api/doctors/{id}:
 *   patch:
 *     summary: Update doctor
 *     description: Update doctor details such as qualification, experience, consultation fee, availability, and status.
 *     tags:
 *       - Doctors
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
 *     requestBody:
 *       required: true
 *       description: Doctor fields to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qualification:
 *                 type: string
 *                 description: Doctor qualification
 *               experience_years:
 *                 type: number
 *                 description: Total years of experience
 *               consultation_fee:
 *                 type: number
 *                 description: Doctor consultation fee amount
 *               is_available:
 *                 type: boolean
 *                 description: Indicates if the doctor is available for appointments
 *               status:
 *                 type: string
 *                 description: Current status of the doctor (e.g., ACTIVE, INACTIVE)
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - User does not have permission
 *       404:
 *         description: Doctor not found
 */

doctorRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR']),
  validate(updateDoctorSchema),
  asyncHandler(doctorController.updateDoctor),
);

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete doctor
 *     description: Delete a doctor by ID. Only ADMIN users are allowed to perform this operation.
 *     tags:
 *       - Doctors
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
 *         description: Doctor deleted successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can delete a doctor
 *       404:
 *         description: Doctor not found
 */

doctorRoute.delete(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(doctorController.deleteDoctor),
);

/**
 * @swagger
 * /api/doctors/appointments/{id}/approve:
 *   patch:
 *     summary: Approve appointment
 *     description: Allows a doctor to approve a pending appointment by its ID.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Appointment approved successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can approve appointments
 *       404:
 *         description: Appointment not found
 */

doctorRoute.patch(
  '/appointments/:id/approve',
  authMiddleware,
  requireRole(['DOCTOR']),
  asyncHandler(doctorController.approveAppointment),
);

/**
 * @swagger
 * /api/doctors/appointments/{id}/reject:
 *   patch:
 *     summary: Reject appointment
 *     description: Allows a doctor to reject a pending appointment by its ID.
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Appointment rejected successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can reject appointments
 *       404:
 *         description: Appointment not found
 */

doctorRoute.patch(
  '/appointments/:id/reject',
  authMiddleware,
  requireRole(['DOCTOR']),
  asyncHandler(doctorController.rejectAppointment),
);
export default doctorRoute;
