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

  async findUnverifiedUser(
    skip: number, 
    limit: number, 
    sort?: string, 
    order: "ASC" | "DESC" = "ASC", 
    search?: string
  ): Promise<[User[], number]>{

    const query = await this.userRepository
      .createQueryBuilder("user")
      .where("user.is_verified = :status", {status: false})

      if(search){
        query.andWhere(`(user.name ILIKE :search OR user.email ILIKE :search)`,{
          search: `%${search}%`
        });
      }

      const allowedSortFields = ['created_at'];

      if(sort && allowedSortFields.includes(sort)){
        query.orderBy(`user.${sort}`, order)
      }else{
        query.orderBy(`user.created_at`, "DESC")
      }

    const users = await this.userRepository.find({
      where: { is_verified: false },
      order: { created_at: 'DESC' },
    });

    query.distinct();

    query.skip(skip).take(limit);

    const [user, total] = await query.getManyAndCount();

    return [user, total];
  }

  async verifiedUserById(userId: string, data: verifyUser) {
    const VerifiedUser = await this.userRepository.update(
      { user_id: userId },
      { is_verified: data.is_verified },
    );
    return VerifiedUser;
  }

  async findPendigDoctor(
    skip: number, 
    limit: number, 
    department?: string,
    sort?: string, 
    order: "ASC" | "DESC" = "ASC", 
    search?: string
  ): Promise<[Doctor[], number]>{

    const query = this.doctorRepository
      .createQueryBuilder("doctor")
      .leftJoinAndSelect("doctor.user", "user")
      .leftJoinAndSelect("doctor.department", "department")
      .leftJoinAndSelect("doctor.address", "address")
      // .leftJoinAndSelect("doctor.status", "status")
      .where("doctor.status = :status", {status: DoctorStatus.PENDING})

    if(department){
      query.andWhere(`department.department_name = :department`, {
        department
      })
    }

    if(search){
      query.andWhere(`(user.name ILIKE :search OR doctor.qualification ILIKE :search)`, {
        search: `%${search}%`,
      })
    }

    const allowedSortFields = ['experience_years', 'created_at'];
    
    if(sort && allowedSortFields.includes(sort)){
      query.orderBy(`doctor.${sort}`, order)
    }else{
      query.orderBy('doctor.created_at', 'DESC');
    }

    query.distinct();

    query.skip(skip).take(limit);

    const [doctors, total] = await query.getManyAndCount();

    // const doctors = await this.doctorRepository.find({
    //   where: { status: DoctorStatus.PENDING },
    //   relations: { user: true, department: true, address: true },
    //   order: { created_at: 'ASC' },
    // });
    return [doctors, total];
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
