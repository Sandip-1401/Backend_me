import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { PaymentService } from "./payment.service";
import { BillingRepository } from "../billing/billing.repository";
import { AppointmentStatus, AppointmentStatusName } from "../../entities/appointment_status.entities";
import { AppDataSource } from "../../config/datasource";
import { Appointment } from "../../entities/appointment.entities";
import { successResponse } from "../../common/utils/successResponse";

export class PaymentController {

  private paymentService = new PaymentService();
   private billingRepository = new BillingRepository();
   private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
   private appointmentRepository = AppDataSource.getRepository(Appointment);

  generateQR = async (req: AuthRequest, res: Response) => {

    const billId = String(req.params.billId);

    const QR = await this.paymentService.generateQR(billId);

    return successResponse(res, "QR code generated successfully", QR)
  };

  payBill = async (req: AuthRequest, res: Response) => {

   const billId = String(req.params.billId);
   const { amount } = req.body;

   const payment = await this.paymentService.payBill(billId, amount);

   const bill = await this.billingRepository.findByBillId(billId);

   const statusId = await this.appointmentStatusRepository.findOne({
      where: { status_name: AppointmentStatusName.COMPLETED }
   });

   if (bill && bill.appointment && statusId) {

      bill.appointment.status = statusId;

      await this.appointmentRepository.save(bill.appointment);
   }
   return successResponse(res, "Payment Completed successful", payment)
   
   };
}