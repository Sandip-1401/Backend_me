import { CreatePrescriptionDto } from './dto/createPrescriptionDto';
import { PrescriptionRepository } from './prescription.repository';
import { AppDataSource } from '../../config/datasource';
import { Prescription } from '../../entities/prescription.entities';
import { PrescriptionMedicine } from '../../entities/prescription_medicine.entities';
import { AppError } from '../../common/errors/AppError';
import { MedicalRecord } from '../../entities/medical_records.entities';
import { MedicalRecordRepository } from '../medical-record/medical-record.repository';
import { DoctorRepository } from '../doctor/doctor.repository';
import PatientRepository from '../patient/patient.repository';
import { sendNotification } from '../../common/utils/sendNotification';
import { NotificationType } from '../../entities/notification.entities';

export class PrescriptionService {
  private prescriptionRepository = new PrescriptionRepository();
  private doctorRepository = new DoctorRepository();
  private patientRepository = new PatientRepository();

  async createPrescription(userId: string, data: CreatePrescriptionDto) {

    return await AppDataSource.transaction(async (manager) => {

      const prescriptionRepo = manager.getRepository(Prescription);
      const medicineRepo = manager.getRepository(PrescriptionMedicine);
      const medicalRecordRepo = manager.getRepository(MedicalRecord);

      const medicalRecord = await medicalRecordRepo.findOne({
        where: { medical_record_id: data.medical_record_id },
        relations: {
          doctor: true,
          patient: true,
          appointment: true
        },
      });

      if (!medicalRecord) {
        throw new AppError('Medical record not found', 404, 'MEDICAL_RECORD_NOT_FOUND');
      }

      const doctor = await this.doctorRepository.findByUserId(userId);

      if (!doctor) throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');

      if (doctor.doctor_id !== medicalRecord?.doctor.doctor_id) {
        throw new AppError(
          'You are not allowed to create prescription for this medical record',
          403,
          'FORBIDDEN',
        );
      }

      const existingPrescription = await prescriptionRepo.findOne({
        where: {
          medical_record: {
            medical_record_id: data.medical_record_id,
          },
        },
      });

      if (existingPrescription) {
        throw new AppError(
          'Prescription already exists for this medical record',
          409,
          'PRESCRIPTION_ALREADY_EXISTS',
        );
      }

      const prescription = await prescriptionRepo.save({
        medical_record: medicalRecord,
        doctor: medicalRecord.doctor,
        patient: medicalRecord.patient,
        notes: data.notes,
      });

      const medicines = data.medicines.map((medicine) => ({
        prescription: { prescription_id: prescription.prescription_id },
        medicine_name: medicine.medicine_name,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        duration_days: medicine.duration_days,
        unit_price: medicine.unit_price,
      }));

      await medicineRepo.save(medicines);

      sendNotification(
          doctor.doctor_id,
          medicalRecord.patient.patient_id,
          `Prescription created`,
          `Your prescription for our appointment is ready`,
          NotificationType.APPOINTMENT,
          prescription.prescription_id
      )

      return prescription;
    });
  }

  async getByMedicalRecord(medicalRecordId: string) {
    const prescription = await this.prescriptionRepository.findByMedicalRecord(medicalRecordId);

    if (!prescription) {
      throw new AppError('Prescription not found', 404, 'PRESCRIPTION_NOT_FOUND');
    }

    return prescription;
  }

  async getByPatient(userId: string, patientId: string) {
    const prescriptions = await this.prescriptionRepository.findByPatient(patientId);

    const patient = await this.patientRepository.findById(patientId);

    if (patient?.user.user_id !== userId) {
      throw new AppError("You don't have permission for this", 400, 'UNAUTHORIZED');
    }

    if (!prescriptions || prescriptions.length === 0) {
      throw new AppError(
        'No prescriptions found for this patient',
        404,
        'PATIENT_PRESCRIPTIONS_NOT_FOUND',
      );
    }

    return prescriptions;
  }

  async getByDoctor(userId: string, doctorId: string) {
    const prescriptions = await this.prescriptionRepository.findByDoctor(doctorId);

    const doctor = await this.doctorRepository.findByDoctorId(doctorId);

    if (doctor?.user.user_id !== userId) {
      throw new AppError("You don't have permission for this", 400, 'UNAUTHORIZED');
    }

    if (!prescriptions || prescriptions.length === 0) {
      throw new AppError(
        'No prescriptions found for this patient',
        404,
        'PATIENT_PRESCRIPTIONS_NOT_FOUND',
      );
    }

    return prescriptions;
  }

  async getById(prescriptionId: string) {
    const prescription = await this.prescriptionRepository.findById(prescriptionId);

    if (!prescription) {
      throw new AppError('Prescription not found', 404, 'PRESCRIPTION_NOT_FOUND');
    }

    return prescription;
  }
}
