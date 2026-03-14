import { applyFilter, applyPagination, applySearch, applySorting } from '../../common/utils/FSSP/fssp.util';
import { AppDataSource } from '../../config/datasource';
import { MedicalRecord } from '../../entities/medical_records.entities';

export class MedicalRecordRepository {
  private medicalRecordRepository = AppDataSource.getRepository(MedicalRecord);

  async createRecord(data: Partial<MedicalRecord>) {
    const record = this.medicalRecordRepository.create(data);
    return await this.medicalRecordRepository.save(record);
  }

  async findByAppointment(appointmentId: string) {
    return this.medicalRecordRepository.findOne({
      where: { appointment: { appointment_id: appointmentId } },
      relations: {
        appointment: true,
        doctor: true,
        patient: true,
      },
    });
  }

  async findByPatient(patientId: string) {
    return this.medicalRecordRepository.find({
      where: { patient: { patient_id: patientId } },
      relations: {
        appointment: true,
        doctor: true,
        patient: true,
      },
      order: { record_date: 'DESC' },
    });
  }

  async findByDoctor(doctorId: string) {
    return this.medicalRecordRepository.find({
      where: { doctor: { doctor_id: doctorId } },
      relations: {
        appointment: true,
        doctor: true,
        patient: true,
      },
      order: { record_date: 'DESC' },
    });
  }

  async getAll(
    skip: number,
    limit: number,
    sort?: string,
    order: "ASC" | "DESC" = "ASC",
    search?: string
  ): Promise<[MedicalRecord[], number]>{

    const query = this.medicalRecordRepository
      .createQueryBuilder("medicalRecord")
      .leftJoinAndSelect("medicalRecord.patient", "patient")
      .leftJoinAndSelect("medicalRecord.doctor", "doctor")
      .leftJoinAndSelect("medicalRecord.appointment", "appointment")
      .leftJoinAndSelect("patient.user", "patuser")
      .leftJoinAndSelect("doctor.user", "docuser")

    // applyFilter
    applySearch(query, ["medicalRecord.diagnosis", "medicalRecord.notes", "patuser.name", "docuser.name"], search);

    const allowedSortFields = ["record_date"];

    applySorting(query, "medicalRecord", sort, order, allowedSortFields);
    applyPagination(query, skip, limit);

    const [medical_record, total] = await query.getManyAndCount();

    return [medical_record, total];

    // return this.medicalRecordRepository.find({
    //   relations: {
    //     appointment: true,
    //     doctor: true,
    //     patient: true,
    //   },
    // });
  }
}
