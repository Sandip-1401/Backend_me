import { BillingRepository } from './billing.repository';
import { PrescriptionRepository } from '../prescription/prescription.repository';
import { BillStatus } from '../../entities/bill.entities';
import { AppDataSource } from '../../config/datasource';
import { Doctor } from '../../entities/doctor.entities';

export class BillingService {
  private billingRepository = new BillingRepository();
  private prescriptionRepository = new PrescriptionRepository();
  private doctorRepository = AppDataSource.getRepository(Doctor);

  async generateBillFromPrescription(prescriptionId: string, userId: string) {
    const prescription = await this.prescriptionRepository.findById(prescriptionId);

    if (!prescription) {
      throw new Error('Prescription not found');
    }

    const doctor = await this.doctorRepository.findOne({
      where: { user: { user_id: userId } },
    });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    if (doctor.doctor_id !== prescription.doctor.doctor_id) {
      throw new Error('You are not allowed to generate bill for this prescription');
    }

    const patient = prescription.patient;
    const appointment = prescription.medical_record.appointment;
    const medicines = prescription.medicines;

    const existingBill = await this.billingRepository.findByAppointment(appointment.appointment_id);

    if (existingBill) {
      throw new Error('Bill already exists for this appointment');
    }

    let totalAmount = 0;

    let discount_amount = 0;

    const billItems = medicines.map((medicine) => {
      const quantity = medicine.duration_days;
      const unitPrice = Number(medicine.unit_price || 0);
      const amount = quantity * unitPrice;

      totalAmount += amount;
      discount_amount += amount / 5;

      return {
        item_type: 'MEDICINE',
        quantity,
        unit_price: unitPrice,
        amount,
      };
    });

    const bill = await this.billingRepository.createBill({
      patient,
      appointment,
      bill_number: `BILL-${Date.now()}`,
      bill_date: new Date(),
      total_amount: totalAmount,
      discount_amount: discount_amount,
      net_amount: totalAmount - discount_amount,
      status: BillStatus.PENDING,
    });

    const items = billItems.map((item) => ({
      ...item,
      bill,
    }));

    await this.billingRepository.createBillItems(items);

    return {
      bill,
      items,
    };
  }

  async getBillByAppointment(appointmentId: string) {
    const bill = await this.billingRepository.findByAppointment(appointmentId);

    if (!bill) {
      throw new Error('Bill not found for this appointment');
    }

    return bill;
  }
}
