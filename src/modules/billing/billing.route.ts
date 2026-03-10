import { Router } from 'express';
import { BillingController } from './billing.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const router = Router();
const billingController = new BillingController();

router.post('/generate/:prescriptionId', authMiddleware, requireRole(["DOCTOR"]), billingController.generateBill);

router.get('/appointment/:appointmentId', authMiddleware, requireRole(["DOCTOR", "ADMIN", "PATIENT"]), billingController.getBillByAppointment);

export default router;
