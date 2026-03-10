import { AppDataSource } from '../../config/datasource';
import { Prescription } from '../../entities/prescription.entities';
import { PrescriptionMedicine } from '../../entities/prescription_medicine.entities';

export class PrescriptionRepository {
  private prescriptionRepository = AppDataSource.getRepository(Prescription);
  private prescriptionMedicineRepository = AppDataSource.getRepository(PrescriptionMedicine);

  async createPrescription(data: Partial<Prescription>) {
    const prescription = this.prescriptionRepository.create(data);
    return await this.prescriptionRepository.save(prescription);
  }

  async createPresciptionMedicine(data: Partial<PrescriptionMedicine>[]) {
    const prescriptionMedicine = this.prescriptionMedicineRepository.create(data);
    return await this.prescriptionMedicineRepository.save(prescriptionMedicine);
  }

  async findByMedicalRecord(medicalRecordId: string) {
    return this.prescriptionRepository.findOne({
      where: { medical_record: { medical_record_id: medicalRecordId } },
      relations: {
        medicines: true,
        doctor: true,
        patient: true,
        medical_record: true,
      },
    });
  }

  async findByPatient(patientId: string) {
    return this.prescriptionRepository.find({
      where: {
        patient: { patient_id: patientId },
      },
      relations: {
        medicines: true,
        doctor: true,
        patient: true,
        medical_record: true,
      },
      order: {
        prescribed_date: 'DESC',
      },
    });
  }


  async findByDoctor(doctorId: string) {
    return this.prescriptionRepository.find({
      where: {
        doctor: {doctor_id: doctorId}
      },
      relations: {
        medicines: true,
        doctor: true,
        patient: true,
        medical_record: true,
      },
      order: {
        prescribed_date: 'DESC',
      },
    });
  }

  async findById(prescriptionId: string) {
    return this.prescriptionRepository.findOne({
      where: {
        prescription_id: prescriptionId,
      },
      relations: {
        medicines: true,
        doctor: true,
        patient: true,
        medical_record: true,
      },
    });
  }
}
