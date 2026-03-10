import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { BillingService } from './billing.service';

export class BillingController {
  private billingService = new BillingService();

  generateBill = async (req: AuthRequest, res: Response) => {
    const prescriptionId = String(req.params.prescriptionId);
    const userId = String(req.user?.user_id);

    const bill = await this.billingService.generateBillFromPrescription(prescriptionId, userId);

    return res.status(201).json({
      success: true,
      message: 'Bill generated successfully',
      data: bill,
    });
  };

  getBillByAppointment = async (req: AuthRequest, res: Response) => {
    const appointmentId = String(req.params.appointmentId);

    const bill = await this.billingService.getBillByAppointment(appointmentId);

    return res.status(200).json({
      success: true,
      data: bill,
    });
  };
}
