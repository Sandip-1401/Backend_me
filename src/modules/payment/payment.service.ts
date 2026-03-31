import { PaymentRepository } from "./payment.repository";
import { QRUtil } from "../../utils/qr.util";
import { BillStatus } from "../../entities/bill.entities";
import { PaymentStatus } from "../../entities/payment.entities";
import { sendNotification } from "../../common/utils/sendNotification";
import { NotificationType } from "../../entities/notification.entities";

export class PaymentService {
  private paymentRepository = new PaymentRepository();

  async generateQR(billId: string) {
    const bill = await this.paymentRepository.findBillById(billId);

    if (!bill) {
      throw new Error('Bill not found');
    }

    const qr = await QRUtil.generateQR({
      billId: bill.bill_id,
      amount: bill?.net_amount,
      type: 'PAYMENT',
    });

    return {
      billId: bill.bill_id,
      amount: bill.net_amount,
      qr,
    };
  }

  async payBill(billId: string, amount: number) {
    const bill = await this.paymentRepository.findBillById(billId);

    if (!bill) {
      throw new Error('Bill not found');
    }

    if (amount !== Number(bill.net_amount)) {
      throw new Error('Invalid payment amount');
    }

    const payment = await this.paymentRepository.createPayment({
      bill,
      patient: bill.patient,
      amount,
      transaction_id: `${new Date().getMilliseconds()}${String(Date.now())}${String(Date.now())}`,
      payment_method: 'QR',
      payment_date: new Date(),
      status: PaymentStatus.SUCCESS,
    });

    bill.status = BillStatus.PAID;

    await this.paymentRepository.saveBill(bill);
    sendNotification(
      String(bill.appointment?.doctor.user.user_id),
      bill.patient.user.user_id,
      `Payment`,
      `Payment successfully done by ${bill.patient.user.name}`,
      NotificationType.PAYMENT,
      payment.payment_id,
      new Date()
    )

    return payment;
  }
}
