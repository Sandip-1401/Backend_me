import { Router } from 'express';
import { AppointmentController } from './appointment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createAppointmentSchema, updateAppointmentSchema } from './appointment.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const appointmentRoute = Router();

const appointmentController = new AppointmentController();

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve a paginated list of all appointments. This endpoint is accessible only by ADMIN users.
 *     tags:
 *       - Appointments
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
 *         name: search
 *         required: false
 *         description: Search appointments by related fields (such as patient or doctor information)
 *         schema:
 *           type: string
 *           example: john
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Field used to sort appointments
 *         schema:
 *           type: string
 *           example: created_at
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
 *         description: Appointments fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access all appointments
 */

appointmentRoute.get(
  '/',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(appointmentController.getAll),
);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create appointment
 *     description: Create a new appointment with a doctor. Only users with the PATIENT role can create appointments.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Appointment booking details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the doctor with whom the appointment is being booked
 *                 example: 9726439c-57fa-4cc4-92b5-c783b0c9d8a9
 *               appointment_date:
 *                 type: string
 *                 description: Date of the appointment
 *                 example: 2026-03-20
 *               appointment_time:
 *                 type: string
 *                 description: Time of the appointment
 *                 example: "10:30"
 *               reason:
 *                 type: string
 *                 description: Reason for the appointment
 *                 example: Fever and headache
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT can create appointments
 */

appointmentRoute.post(
  '/',
  authMiddleware,
  requireRole(['PATIENT']),
  validate(createAppointmentSchema),
  asyncHandler(appointmentController.createAppointment),
);

/**
 * @swagger
 * /api/appointments/myappointment:
 *   get:
 *     summary: Get my appointments
 *     description: Retrieve appointments associated with the currently authenticated user. Doctors see appointments assigned to them and patients see the appointments they booked.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointments fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR or PATIENT can access this resource
 */

appointmentRoute.get(
  '/myappointment',
  authMiddleware,
  requireRole(['DOCTOR', 'PATIENT']),
  asyncHandler(appointmentController.getMyAppointments),
);

/**
 * @swagger
 * /api/appointments/{id}:
 *   patch:
 *     summary: Update appointment
 *     description: Update appointment details such as appointment date, time, reason, or status. This operation can be performed by a DOCTOR or PATIENT.
 *     tags:
 *       - Appointments
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
 *     requestBody:
 *       required: true
 *       description: Appointment fields to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointment_date:
 *                 type: string
 *                 description: Updated appointment date
 *                 example: 2026-03-25
 *               appointment_time:
 *                 type: string
 *                 description: Updated appointment time
 *                 example: "14:30"
 *               reason:
 *                 type: string
 *                 description: Reason for the appointment
 *                 example: Follow-up consultation
 *               status:
 *                 type: string
 *                 description: Appointment status
 *                 example: CONFIRMED
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR or PATIENT can update the appointment
 *       404:
 *         description: Appointment not found
 */

appointmentRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(['DOCTOR', 'PATIENT']),
  validate(updateAppointmentSchema),
  asyncHandler(appointmentController.updateAppointment),
);

/**
 * @swagger
 * /api/appointments/doctor/{id}/avilable-slots:
 *   get:
 *     summary: Get available slots for a doctor
 *     description: Retrieve available appointment time slots for a specific doctor based on the doctor ID.
 *     tags:
 *       - Appointments
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
 *       - in: query
 *         name: date
 *         required: false
 *         description: Date to check available slots
 *         schema:
 *           type: string
 *           format: date
 *           example: 2026-03-20
 *     responses:
 *       200:
 *         description: Available slots fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Doctor not found
 */

appointmentRoute.get(
  '/doctor/:id/avilable-slots',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(appointmentController.getAvailableSlots),
);

export default appointmentRoute;
