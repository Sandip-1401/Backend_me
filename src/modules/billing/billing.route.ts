import { Router } from 'express';
import { BillingController } from './billing.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const billingController = new BillingController();

router.post('/generate/:prescriptionId', authMiddleware, billingController.generateBill);

router.get('/appointment/:appointmentId', authMiddleware, billingController.getBillByAppointment);

export default router;
