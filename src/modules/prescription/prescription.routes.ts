import { Router } from 'express';
import { PrescriptionController } from './prescription.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createPrescriptionSchema } from './prescription.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const prescriptionRoute = Router();
const prescriptionController = new PrescriptionController();

/**
 * @swagger
 * /api/prescriptions:
 *   post:
 *     summary: Create prescription
 *     description: Create a new prescription for a medical record including prescribed medicines. Only users with the DOCTOR role can create prescriptions.
 *     tags:
 *       - Prescriptions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Prescription details with medicines
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medical_record_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the related medical record
 *                 example: 0a491ab3-d99e-41ad-92b9-b841c5e1f308
 *               notes:
 *                 type: string
 *                 description: Additional prescription notes from the doctor
 *                 example: Take medicines after meals
 *               medicines:
 *                 type: array
 *                 description: List of medicines prescribed
 *                 items:
 *                   type: object
 *                   properties:
 *                     medicine_name:
 *                       type: string
 *                       description: Name of the medicine
 *                       example: Paracetamol
 *                     dosage:
 *                       type: string
 *                       description: Dosage instruction
 *                       example: 500mg
 *                     frequency:
 *                       type: string
 *                       description: How often the medicine should be taken
 *                       example: Twice a day
 *                     duration_days:
 *                       type: number
 *                       description: Duration in days for which the medicine should be taken
 *                       example: 5
 *                     unit_price:
 *                       type: number
 *                       description: Price per unit of the medicine
 *                       example: 20
 *     responses:
 *       201:
 *         description: Prescription created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can create prescriptions
 */

prescriptionRoute.post(
  '/',
  authMiddleware,
  requireRole(['DOCTOR']),
  validate(createPrescriptionSchema),
  asyncHandler(prescriptionController.createPrescription),
);

/**
 * @swagger
 * /api/prescriptions/medical-record/{medicalRecordId}:
 *   get:
 *     summary: Get prescriptions by medical record
 *     description: Retrieve all prescriptions associated with a specific medical record using the medical record ID.
 *     tags:
 *       - Prescriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: medicalRecordId
 *         required: true
 *         description: Medical Record ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Prescriptions fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: No prescriptions found for this medical record
 */

prescriptionRoute.get(
  '/medical-record/:medicalRecordId',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(prescriptionController.getByMedicalRecord),
);

/**
 * @swagger
 * /api/prescriptions/patient/{patientId}:
 *   get:
 *     summary: Get prescriptions by patient
 *     description: Retrieve all prescriptions associated with a specific patient using the patient ID.
 *     tags:
 *       - Prescriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Prescriptions fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: No prescriptions found for this patient
 */

prescriptionRoute.get(
  '/patient/:patientId',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(prescriptionController.getByPatient),
);

/**
 * @swagger
 * /api/prescriptions/doctor/{doctorId}:
 *   get:
 *     summary: Get prescriptions by doctor
 *     description: Retrieve all prescriptions created by a specific doctor using the doctor ID.
 *     tags:
 *       - Prescriptions
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
 *         description: Prescriptions fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only ADMIN or DOCTOR can access doctor prescriptions
 *       404:
 *         description: No prescriptions found for this doctor
 */

prescriptionRoute.get(
  '/doctor/:doctorId',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR']),
  asyncHandler(prescriptionController.getByDoctoe),
);

/**
 * @swagger
 * /api/prescriptions/my-prescription:
 *   get:
 *     summary: Get my Prescription
 *     description: Retrieve a paginated list of my Prescription. This endpoint is accessible only by ADMIN users.
 *     tags:
 *       - Prescriptions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Prescription fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only Login user can access their Prescription
 */

prescriptionRoute.get(
  '/my-prescription',
  authMiddleware,
  requireRole(['PATIENT', 'DOCTOR']),
  asyncHandler(prescriptionController.getMyPrescription)
)

/**
 * @swagger
 * /api/prescriptions/{prescriptionId}:
 *   get:
 *     summary: Get prescription by ID
 *     description: Retrieve a specific prescription using its prescription ID.
 *     tags:
 *       - Prescriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prescriptionId
 *         required: true
 *         description: Prescription ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Prescription fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Prescription not found
 */

prescriptionRoute.get(
  '/:prescriptionId',
  authMiddleware,
  requireRole(['ADMIN', 'DOCTOR', 'PATIENT']),
  asyncHandler(prescriptionController.getById),
);

export default prescriptionRoute;
