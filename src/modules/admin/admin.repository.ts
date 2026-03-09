import { AppDataSource } from '../../config/datasource';
import { Doctor, DoctorStatus } from '../../entities/doctor.entities';
import { User } from '../../entities/user.entities';

interface verifyUser {
  is_verified: boolean;
}

export class AdminRepository {
  private userRepository = AppDataSource.getRepository(User);
  private doctorRepository = AppDataSource.getRepository(Doctor);

  async findUnverifiedUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        user_id: userId,
        is_verified: false,
      },
    });
    return user;
  }

  async findUnverifiedUser() {
    const users = await this.userRepository.find({
      where: { is_verified: false },
      order: { created_at: 'DESC' },
    });
    return users;
  }

  async verifiedUserById(userId: string, data: verifyUser) {
    const VerifiedUser = await this.userRepository.update(
      { user_id: userId },
      { is_verified: data.is_verified },
    );
    return VerifiedUser;
  }

  async findPendigDoctor() {
    const doctors = await this.doctorRepository.find({
      where: { status: DoctorStatus.PENDING },
      relations: { user: true, department: true, address: true },
      order: { created_at: 'ASC' },
    });
    return doctors;
  }

  async findPendingDoctorById(doctorId: string) {
    const doctor = await this.doctorRepository.findOne({
      where: {
        doctor_id: doctorId,
        status: DoctorStatus.PENDING,
      },
    });

    return doctor;
  }

  async activeDoctor(doctorId: string, data: Partial<Doctor>) {
    const activeDoctor = this.doctorRepository.update(doctorId, data);
    return activeDoctor;
  }
}
