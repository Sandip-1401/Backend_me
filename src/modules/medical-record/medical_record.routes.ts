import { Router } from 'express';
import { MedicalRecordController } from './medical_record.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createMedicalRecordSchema } from './medicalRecord.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { requireRole } from '../../middlewares/role.middleware';

const medicalRecordRoute = Router();

const medicalRecordController = new MedicalRecordController();

/**
 * @swagger
 * /api/medical-records:
 *   post:
 *     summary: Create medical record
 *     description: Create a new medical record for an appointment. Only users with the DOCTOR role are allowed to create medical records.
 *     tags:
 *       - Medical Records
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Medical record details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointment_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the appointment related to the medical record
 *                 example: 0a491ab3-d99e-41ad-92b9-b841c5e1f308
 *               diagnosis:
 *                 type: string
 *                 description: Diagnosis given by the doctor
 *                 example: Viral infection
 *               notes:
 *                 type: string
 *                 description: Additional notes provided by the doctor
 *                 example: Patient advised to rest and drink fluids
 *     responses:
 *       201:
 *         description: Medical record created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can create medical records
 */

medicalRecordRoute.post(
  '/',
  authMiddleware,
  requireRole(['DOCTOR']),
  validate(createMedicalRecordSchema),
  asyncHandler(medicalRecordController.createRecord),
);

/**
 * @swagger
 * /api/medical-records:
 *   get:
 *     summary: Get all medical records
 *     description: Retrieve a paginated list of all medical records. This endpoint is accessible only by ADMIN users.
 *     tags:
 *       - Medical Records
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
 *         description: Search medical records by diagnosis or related information
 *         schema:
 *           type: string
 *           example: fever
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Field used to sort medical records
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
 *         description: Medical records fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN can access all medical records
 */

medicalRecordRoute.get(
  '/',
  authMiddleware,
  requireRole(['ADMIN']),
  asyncHandler(medicalRecordController.getAllRecords),
);

/**
 * @swagger
 * /api/medical-records/patient/{patient_id}:
 *   get:
 *     summary: Get patient medical records
 *     description: Retrieve all medical records associated with a specific patient using the patient ID. Accessible by ADMIN, DOCTOR, or the PATIENT.
 *     tags:
 *       - Medical Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patient_id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Patient medical records fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Medical records not found for the patient
 */

medicalRecordRoute.get(
  '/patient/:patient_id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(medicalRecordController.getPatientRecord),
);

/**
 * @swagger
 * /api/medical-records/doctor/{doctor_id}:
 *   get:
 *     summary: Get doctor medical records
 *     description: Retrieve all medical records created by a specific doctor using the doctor ID. Accessible by ADMIN or DOCTOR.
 *     tags:
 *       - Medical Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor medical records fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN or DOCTOR can access doctor records
 *       404:
 *         description: Medical records not found for the doctor
 */

medicalRecordRoute.get(
  '/doctor/:doctor_id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR']),
  asyncHandler(medicalRecordController.getDoctorRecord),
);

/**
 * @swagger
 * /api/medical-records/appointment/{appointment_id}:
 *   get:
 *     summary: Get medical record by appointment
 *     description: Retrieve the medical record associated with a specific appointment using the appointment ID. Accessible by ADMIN, DOCTOR, or PATIENT.
 *     tags:
 *       - Medical Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointment_id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Medical record fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Medical record not found for the appointment
 */

medicalRecordRoute.get(
  '/appointment/:appointment_id',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(medicalRecordController.getAppointmentRecored),
);

export default medicalRecordRoute;
