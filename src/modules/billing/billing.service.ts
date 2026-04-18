import { BillingRepository } from './billing.repository';
import { PrescriptionRepository } from '../prescription/prescription.repository';
import { BillStatus } from '../../entities/bill.entities';
import { AppDataSource } from '../../config/datasource';
import { Doctor } from '../../entities/doctor.entities';
import { sendNotification } from '../../common/utils/sendNotification';
import { NotificationType } from '../../entities/notification.entities';
import PatientRepository from '../patient/patient.repository';
import { AppError } from '../../common/errors/AppError';

export class BillingService {
  private billingRepository = new BillingRepository();
  private prescriptionRepository = new PrescriptionRepository();
  private doctorRepository = AppDataSource.getRepository(Doctor);
  private patientRepository = new PatientRepository();

  async generateBillFromPrescription(prescriptionId: string, userId: string) {
    const prescription = await this.prescriptionRepository.findById(prescriptionId);

    if (!prescription) {
      throw new Error('Prescription not found');
    }

    const doctor = await this.doctorRepository.findOne({
      where: { user: { user_id: userId } },
      relations: {user: true}
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

    // --- ACCOUNTING CALCULATION START ---
    let totalAmount = 0;
    let discount_amount = 0;

    const billItems = medicines.map((medicine) => {
      // Correct Quantity: Days * Frequency count (e.g. "1-1-1" = 3)
      const timesPerDay = medicine.frequency.split('-').filter(f => f === '1').length || 1;
      const quantity = medicine.duration_days * timesPerDay;

      const unitPrice = Number(medicine.unit_price || 0);
      const amount = Number((quantity * unitPrice).toFixed(2));

      totalAmount += amount;
      // 20% discount calculation
      discount_amount += Number((amount * 0.20).toFixed(2));

      return {
        item_type: 'MEDICINE',
        quantity,
        unit_price: unitPrice,
        amount,
      };
    });

    // Adding Consultation Fee
    const consultationFee = Number(doctor.consultation_fee || 0);
    totalAmount += consultationFee;

    // Final Net Totals
    const finalTotal = Number(totalAmount.toFixed(2));
    const finalDiscount = Number(discount_amount.toFixed(2));
    const finalNet = Number((finalTotal - finalDiscount).toFixed(2));
    // --- ACCOUNTING CALCULATION END ---

    const bill = await this.billingRepository.createBill({
      patient,
      appointment,
      bill_number: `BILL-${Date.now()}`,
      bill_date: new Date(),
      total_amount: finalTotal,
      discount_amount: finalDiscount,
      net_amount: finalNet,
      status: BillStatus.PENDING,
    });

    const items = billItems.map((item) => ({
      ...item,
      bill,
    }));

    await this.billingRepository.createBillItems(items);

    sendNotification(
      doctor.user.user_id,
      patient.user.user_id,
      `Bill created`,
      `Bill for the our last appointment is ready`,
      NotificationType.PAYMENT,
      bill.bill_id,
      new Date()
    );

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

  async getMyBills(user_id: string) {
    const patient = await this.patientRepository.findByUserId(user_id);

    if (patient) {
      return await this.billingRepository.getBillByPatient(patient.patient_id)
    }

    const doctor = await this.doctorRepository.findOne({
      where: {
        user: { user_id: user_id }
      }
    });

    if (doctor) {
      return await this.billingRepository.getBillByDoctors(doctor.doctor_id);
    }

    throw new AppError("Logged in user is not nghter patient nor doctor", 400, "NO_PATIENT_NOR_DOCTOR");
  }
}
