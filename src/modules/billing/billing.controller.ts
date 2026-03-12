import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { BillingService } from './billing.service';
import { successResponse } from '../../common/utils/successResponse';

export class BillingController {
  private billingService = new BillingService();

  generateBill = async (req: AuthRequest, res: Response) => {
    const prescriptionId = String(req.params.prescriptionId);
    const userId = String(req.user?.user_id);

    const bill = await this.billingService.generateBillFromPrescription(prescriptionId, userId);

    return successResponse(res, 'Bill generated successfully', bill);
  };

  getBillByAppointment = async (req: AuthRequest, res: Response) => {
    const appointmentId = String(req.params.appointmentId);

    const bill = await this.billingService.getBillByAppointment(appointmentId);

    return successResponse(res, 'Bill fetched successfully', bill);
  };
}
