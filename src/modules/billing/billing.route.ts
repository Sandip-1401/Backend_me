import { Router } from 'express';
import { BillingController } from './billing.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { asyncHandler } from '../../common/utils/asyncHandler';

const router = Router();
const billingController = new BillingController();

/**
 * @swagger
 * /api/billing/generate/{prescriptionId}:
 *   post:
 *     summary: Generate bill from prescription
 *     description: Generate a bill for an appointment using a prescription ID. The bill includes medicine charges and applies discount logic. Only the DOCTOR who created the prescription can generate the bill.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prescriptionId
 *         required: true
 *         description: Prescription ID used to generate the bill
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Bill generated successfully
 *       400:
 *         description: Bill already exists or prescription not found
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only the assigned DOCTOR can generate the bill
 *       404:
 *         description: Prescription not found
 */

router.post(
  '/generate/:prescriptionId',
  authMiddleware,
  requireRole(['DOCTOR']),
  asyncHandler(billingController.generateBill),
);

/**
 * @swagger
 * /api/billing/appointment/{appointmentId}:
 *   get:
 *     summary: Get bill by appointment
 *     description: Retrieve the bill associated with a specific appointment using the appointment ID. Accessible by ADMIN, DOCTOR, or PATIENT.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bill fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Bill not found for the appointment
 */

router.get(
  '/appointment/:appointmentId',
  authMiddleware,
  requireRole(['DOCTOR', 'ADMIN', 'PATIENT']),
  asyncHandler(billingController.getBillByAppointment),
);

/**
 * @swagger
 * /api/billing/my-bills:
 *   get:
 *     summary: Get my bills
 *     description: Retrieve the bill associated with a Logged in user.
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bill fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Access denied for this role
 *       404:
 *         description: Bill not found for the appointment
 */

router.get(
  '/my-bills',
  authMiddleware,
  requireRole(['DOCTOR', 'PATIENT']),
  asyncHandler(billingController.getMyBills)
)

export default router;
