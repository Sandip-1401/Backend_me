import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const paymentRoute = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * /api/payments/qr/{billId}:
 *   get:
 *     summary: Generate payment QR
 *     description: Generate a QR code for paying a bill using the bill ID. Only users with the DOCTOR role can generate the payment QR.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: billId
 *         required: true
 *         description: Bill ID for which the payment QR will be generated
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment QR generated successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only DOCTOR can generate payment QR
 *       404:
 *         description: Bill not found
 */

paymentRoute.get(
  '/qr/:billId',
  authMiddleware,
  requireRole(['DOCTOR']),
  paymentController.generateQR,
);

/**
 * @swagger
 * /api/payments/pay/{billId}:
 *   post:
 *     summary: Pay bill
 *     description: Process payment for a bill using the bill ID. Only users with the PATIENT role are allowed to pay the bill.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: billId
 *         required: true
 *         description: Bill ID to be paid
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bill paid successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       403:
 *         description: Forbidden - Only PATIENT can pay the bill
 *       404:
 *         description: Bill not found
 */

paymentRoute.post(
  '/pay/:billId',
  authMiddleware,
  requireRole(['PATIENT']),
  paymentController.payBill,
);

export default paymentRoute;
