import { AppDataSource } from "../../config/datasource";
import { Payment } from "../../entities/payment.entities";
import { Bill } from "../../entities/bill.entities";

export class PaymentRepository {

  private paymentRepository = AppDataSource.getRepository(Payment);
  private billRepository = AppDataSource.getRepository(Bill);

  async findBillById(billId: string) {
    return this.billRepository.findOne({
      where: { bill_id: billId },
      relations: {
        patient: true,
        appointment: true,
      },
    });
  }

  async createPayment(data: Partial<Payment>) {
    const payment = this.paymentRepository.create(data);
    return this.paymentRepository.save(payment);
  }

  async saveBill(bill: Bill) {
    return this.billRepository.save(bill);
  }
}