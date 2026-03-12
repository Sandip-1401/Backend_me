import { Router } from 'express';
import { DoctorSchedulingController } from './doctorScheduling.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  createDoctorScheduleSchema,
  updateDoctorScheduleSchema,
} from './doctorScheduling.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const scheduleRoute = Router();

const controller = new DoctorSchedulingController();

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create doctor schedule
 *     description: Create a weekly schedule for a doctor including working day, start time, end time, slot duration, and maximum number of patients per slot. Only users with the DOCTOR role can create schedules.
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Doctor schedule details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the doctor
 *                 example: 9726439c-57fa-4cc4-92b5-c783b0c9d8a9
 *               day_of_week:
 *                 type: string
 *                 description: Day of the week for the schedule
 *                 enum: [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]
 *                 example: MONDAY
 *               start_time:
 *                 type: string
 *                 description: Start time of the schedule
 *                 example: "09:00"
 *               end_time:
 *                 type: string
 *                 description: End time of the schedule
 *                 example: "17:00"
 *               slot_duration_minutes:
 *                 type: number
 *                 description: Duration of each appointment slot in minutes
 *                 example: 30
 *               max_patients:
 *                 type: number
 *                 description: Maximum number of patients allowed in a slot
 *                 example: 10
 *     responses:
 *       201:
 *         description: Doctor schedule created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can create schedules
 */

scheduleRoute.post(
  '/',
  authMiddleware,
  requireRole(['DOCTOR']),
  validate(createDoctorScheduleSchema),
  asyncHandler(controller.createSchedule),
);

/**
 * @swagger
 * /api/schedules/{doctorId}:
 *   get:
 *     summary: Get doctor schedule
 *     description: Retrieve the schedule for a specific doctor using the doctor ID.
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor schedule fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       404:
 *         description: Schedule not found for the doctor
 */

scheduleRoute.get('/:doctorId', authMiddleware, asyncHandler(controller.getDoctorSchedule));

/**
 * @swagger
 * /api/schedules/{id}:
 *   patch:
 *     summary: Update doctor schedule
 *     description: Update an existing doctor schedule including working day, start time, end time, slot duration, and maximum patients. Only users with the DOCTOR role can update schedules.
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Schedule ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       description: Updated doctor schedule fields
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day_of_week:
 *                 type: string
 *                 description: Day of the week for the schedule
 *                 enum: [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]
 *                 example: TUESDAY
 *               start_time:
 *                 type: string
 *                 description: Start time of the schedule
 *                 example: "10:00"
 *               end_time:
 *                 type: string
 *                 description: End time of the schedule
 *                 example: "16:00"
 *               slot_duration_minutes:
 *                 type: number
 *                 description: Duration of each appointment slot in minutes
 *                 example: 20
 *               max_patients:
 *                 type: number
 *                 description: Maximum number of patients allowed per slot
 *                 example: 8
 *     responses:
 *       200:
 *         description: Doctor schedule updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can update schedules
 *       404:
 *         description: Schedule not found
 */

scheduleRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(['DOCTOR']),
  validate(updateDoctorScheduleSchema),
  asyncHandler(controller.updateSchedule),
);

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: Delete doctor schedule
 *     description: Delete an existing doctor schedule by its ID. Only users with the DOCTOR role can delete schedules.
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Schedule ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor schedule deleted successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can delete schedules
 *       404:
 *         description: Schedule not found
 */

scheduleRoute.delete(
  '/:id',
  authMiddleware,
  requireRole(['DOCTOR']),
  asyncHandler(controller.deleteSchedule),
);

export default scheduleRoute;
