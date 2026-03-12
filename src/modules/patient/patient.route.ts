import { Router } from 'express';
import { PatientCntroller } from './patient.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createPatientSchema, updatePatientSchema } from './patient.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const patientRoute = Router();

const patientController = new PatientCntroller();

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create patient
 *     description: Create a new patient profile linked to a user account. Only users with PATIENT role can create their patient profile.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Patient profile information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user associated with the patient
 *                 example: 1151a2c6-63e5-487e-a7ab-36d121adfba1
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 description: Address ID associated with the patient
 *                 example: 0a491ab3-d99e-41ad-92b9-b841c5e1f308
 *               blood_group:
 *                 type: string
 *                 description: Patient blood group
 *                 enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
 *                 example: O+
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Patient date of birth
 *                 example: 1998-05-21
 *               gender:
 *                 type: string
 *                 description: Patient gender
 *                 enum: [MALE, FEMALE, OTHER]
 *                 example: MALE
 *               height:
 *                 type: number
 *                 description: Patient height in centimeters
 *                 example: 170
 *               weight:
 *                 type: number
 *                 description: Patient weight in kilograms
 *                 example: 65
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT role can create patient profile
 */

patientRoute.post(
  '/',
  authMiddleware,
  // requireRole(["PATIENT"]),
  validate(createPatientSchema),
  asyncHandler(patientController.createPatient),
);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     description: Fetch a paginated list of patients with optional search and sorting. Accessible only by ADMIN users.
 *     tags:
 *       - Patients
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
 *         description: Search patients by name, email, or phone number
 *         schema:
 *           type: string
 *           example: sandip
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Field used to sort patients (allowed values date_of_birth, height, weight, created_at)
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
 *         description: Patients fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access patient list
 */

patientRoute.get(
  '/',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(patientController.getAll),
);

/**
 * @swagger
 * /api/patients/my-profile:
 *   get:
 *     summary: Get logged-in patient profile
 *     description: Retrieve the profile information of the currently authenticated patient.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient profile fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT role can access their profile
 *       404:
 *         description: Patient profile not found
 */

patientRoute.get(
  '/my-profile',
  authMiddleware,
  requireRole(['PATIENT']),
  asyncHandler(patientController.getMyProfile),
);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     description: Retrieve patient profile information by patient ID. Accessible by ADMIN, DOCTOR, or the PATIENT.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Patient fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Patient not found
 */

patientRoute.get(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(patientController.getById),
);

/**
 * @swagger
 * /api/patients/{id}:
 *   patch:
 *     summary: Update patient
 *     description: Update patient profile information. Only users with PATIENT role can update their patient details.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       description: Patient fields to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 description: Address ID associated with the patient
 *                 example: 0a491ab3-d99e-41ad-92b9-b841c5e1f308
 *               blood_group:
 *                 type: string
 *                 description: Patient blood group
 *                 enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
 *                 example: B+
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Patient date of birth
 *                 example: 1995-08-14
 *               gender:
 *                 type: string
 *                 description: Patient gender
 *                 enum: [MALE, FEMALE, OTHER]
 *                 example: FEMALE
 *               height:
 *                 type: number
 *                 description: Patient height in centimeters
 *                 example: 168
 *               weight:
 *                 type: number
 *                 description: Patient weight in kilograms
 *                 example: 62
 *               status:
 *                 type: string
 *                 description: Current patient status
 *                 enum: [ACTIVE, INACTIVE, DECEASED]
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT role can update patient profile
 *       404:
 *         description: Patient not found
 */

patientRoute.patch(
  '/:id',
  authMiddleware,
  requireRole(['PATIENT']),
  validate(updatePatientSchema),
  asyncHandler(patientController.updatePatient),
);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete patient
 *     description: Delete a patient profile by ID. This operation can be performed by an ADMIN or the PATIENT who owns the profile.
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN or the PATIENT can delete this profile
 *       404:
 *         description: Patient not found
 */

patientRoute.delete(
  '/:id',
  authMiddleware,
  requireRole(['ADMIN', 'PATIENT']),
  asyncHandler(patientController.deletePatient),
);

/**
 * @swagger
 * /api/patients/appointments/{id}/cancle:
 *   patch:
 *     summary: Cancel appointment
 *     description: Allows a patient to cancel their appointment using the appointment ID.
 *     tags:
 *       - Patients
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
 *         description: Appointment cancelled successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT can cancel the appointment
 *       404:
 *         description: Appointment not found
 */

patientRoute.patch(
  '/appointments/:id/cancle',
  authMiddleware,
  requireRole(['PATIENT']),
  asyncHandler(patientController.cancleAppointment),
);

export default patientRoute;
