import { AppDataSource } from '../../config/datasource';
import { Bill } from '../../entities/bill.entities';
import { BillItem } from '../../entities/bill_item.entities';
import { Prescription } from '../../entities/prescription.entities';

export class BillingRepository {
  private billRepository = AppDataSource.getRepository(Bill);
  private billingItemRepository = AppDataSource.getRepository(BillItem);
  private prescriptionRepository = AppDataSource.getRepository(Prescription);

  async createBill(data: Partial<Bill>) {
    const bill = this.billRepository.create(data);
    return await this.billRepository.save(bill);
  }

  async createBillItems(data: Partial<BillItem>[]) {
    const billItems = this.billingItemRepository.create(data);
    return await this.billingItemRepository.save(billItems);
  }

  async findByAppointment(appointmentId: string) {
    return await this.billRepository.findOne({
      where: {
        appointment: { appointment_id: appointmentId },
      },
      relations: {
        items: true,
        payments: true,
        patient: true,
      },
    });
  }

  async findByBillId(billId: string){
   return await this.billRepository.findOne({
      where: {bill_id: billId},
       relations: {
         appointment: {
            status: true
         },
         patient: true
    }
   })
  }

  async findById(prescriptionId: string) {
    return this.prescriptionRepository
      .createQueryBuilder('prescription')
      .leftJoinAndSelect('prescription.medicines', 'medicines')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoin('doctor.user', 'user')
      .addSelect('user.user_id')
      .leftJoinAndSelect('prescription.patient', 'patient')
      .leftJoinAndSelect('prescription.medical_record', 'medical_record')
      .leftJoinAndSelect('medical_record.appointment', 'appointment')
      .where('prescription.prescription_id = :prescriptionId', { prescriptionId })
      .getOne();
  }
}
