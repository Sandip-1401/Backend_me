import { AppError } from '../../common/errors/AppError';
import { DoctorStatus } from '../../entities/doctor.entities';
import { buildPagination } from '../../utils/pagination-response.util';
import { getPagination } from '../../utils/pagination.util';
import { AdminRepository } from './admin.repository';

export class AdminService {
  private adminRepository = new AdminRepository();

  async getPendingDoctors(query: any) {

    const {page, limit, skip} = getPagination(query);

    const department = query.department as string | undefined;

    const sort = query.sort as string | undefined;
    const order = (query.order as "ASC" | "DESC") || "ASC";

    const search = query.search as string | undefined;

    const [doctors, total] = await this.adminRepository.findPendigDoctor(skip, limit, department, sort, order, search);

    if (doctors.length <= 0) {
      throw new AppError('No Pending Doctor not found', 404, 'PENDING_DOCTOR_NOT_FOUND');
    }

    return buildPagination(doctors, total, page, limit);

  }

  async activeDoctorById(doctorId: string) {
    const doctor = await this.adminRepository.findPendingDoctorById(doctorId);

    if (!doctor) throw new AppError('Doctor not found', 404, 'DOCTOR_NOT_FOUND');

    return await this.adminRepository.activeDoctor(doctorId, { status: DoctorStatus.ACTIVE });
  }

  async getUnverifiedUser(query: any) {

    const {page, skip, limit} = getPagination(query);
    
    const sort = query.sort as string | undefined;
    const order = (query.order as "ASC" | "DESC") || "ASC";

    const search = query.search as string | undefined;


    const [users, total] = await this.adminRepository.findUnverifiedUser(skip, limit, sort, order, search);

    if(users.length <= 0){
      throw new AppError('No Unverified user not found', 404, 'UNVERIFIE_USER_NOT_FOUND');
    }

    return buildPagination(users, total, page, limit)

  }

  async verifiedUserById(userId: string) {
    const user = await this.adminRepository.findUnverifiedUserById(userId);
    if (user && user.is_verified) {
      throw new AppError('User already verified', 404, 'USER_ALREADY_VERIFIED');
    }

    return await this.adminRepository.verifiedUserById(userId, { is_verified: true });
  }
}
