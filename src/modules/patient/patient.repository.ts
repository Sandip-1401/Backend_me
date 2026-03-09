import { AppDataSource } from '../../config/datasource';
import { Address } from '../../entities/address.entities';
import { Appointment } from '../../entities/appointment.entities';
import { Gender, Patient, PatientStatus } from '../../entities/patient.entities';
import { User } from '../../entities/user.entities';
import { CreatePatientDto } from './dto/createPatientDto';
import { UpdatePatientDto } from './dto/updatePatientDto';

export class PatientRepository {
  private patientRepository = AppDataSource.getRepository(Patient);
  private appointmentRepository = AppDataSource.getRepository(Appointment);

  async createPatient(data: CreatePatientDto) {
    const patient = this.patientRepository.create({
      blood_group: data.blood_group,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      height: data.height,
      weight: data.weight,

      user: { user_id: data.user_id } as User,

      address: data.address_id ? ({ address_id: data.address_id } as Address) : undefined,
    });
    return this.patientRepository.save(patient);
  }

  async findById(patientId: string) {
    return this.patientRepository.findOne({
      where: { patient_id: patientId },
      relations: ['user', 'address'],
    });
  }

  async findAllPatient(
    skip: number,
    limit: number,
    sort?: string,
    order: 'ASC' | 'DESC' = 'ASC',
    search?: string,
  ): Promise<[Patient[], number]> {
    const query = this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.user', 'user')
      .leftJoinAndSelect('patient.address', 'address');

    if (search) {
      query.andWhere(
        `(
               user.name ILIKE :search
               OR user.email ILIKE :search
               OR user.phone_number ILIKE :search
            )`,
        { search: `%${search}%` },
      );
    }

    const allowedSortFields = ['date_of_birth', 'height', 'weight', 'created_at'];

    if (sort && allowedSortFields.includes(sort)) {
      query.orderBy(`patient.${sort}`, order);
    } else {
      query.orderBy('patient.created_at', 'DESC');
    }

    query.distinct(true);

    query.skip(skip).take(limit);

    const [patients, total] = await query.getManyAndCount();

    return [patients, total];
  }

  async findByUserId(userId: string) {
    return this.patientRepository.findOne({
      where: {
        user: { user_id: userId },
      },
      relations: ['user', 'address'],
    });
  }

  async updateAppointmentStatus(appointmentId: string, data: Partial<Appointment>) {
    await this.appointmentRepository.update({ appointment_id: appointmentId }, data);

    return await this.appointmentRepository.findOne({
      where: { appointment_id: appointmentId },
      relations: {
        doctor: true,
        patient: true,
        status: true,
      },
    });
  }

  async updatePatient(patientId: string, data: UpdatePatientDto) {
    return this.patientRepository.update(patientId, {
      blood_group: data.blood_group,
      date_of_birth: data.date_of_birth,
      gender: data.gender as Gender,
      height: data.height,
      weight: data.weight,
      status: data.status as PatientStatus,

      ...(data.address_id && { address: { address_id: data.address_id } as any }),
    });
  }

  async deletePatient(patientId: string) {
    return this.patientRepository.softDelete(patientId);
  }
}

export default PatientRepository;
