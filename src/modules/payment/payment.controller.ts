import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { PaymentService } from "./payment.service";
import { BillingRepository } from "../billing/billing.repository";
import { AppointmentStatus, AppointmentStatusName } from "../../entities/appointment_status.entities";
import { AppDataSource } from "../../config/datasource";
import { Appointment } from "../../entities/appointment.entities";

export class PaymentController {

  private paymentService = new PaymentService();
   private billingRepository = new BillingRepository();
   private appointmentStatusRepository = AppDataSource.getRepository(AppointmentStatus);
   private appointmentRepository = AppDataSource.getRepository(Appointment);

  generateQR = async (req: AuthRequest, res: Response) => {

    const billId = String(req.params.billId);

    const qr = await this.paymentService.generateQR(billId);

    return res.json({
      success: true,
      data: qr,
    });
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

   return res.json({
      success: true,
      message: "Payment successful",
      data: payment,
   });
   };
}