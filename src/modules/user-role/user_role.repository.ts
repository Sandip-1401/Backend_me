import { AppDataSource } from '../../config/datasource';
import { Role } from '../../entities/roles.entities';
import { User } from '../../entities/user.entities';
import { UserRole } from '../../entities/user_role.entities';

export class UserRoleRepository {
  private userRoleRepository = AppDataSource.getRepository(UserRole);

  async assignRole(user: User, role: Role, assigedBy?: User) {
    const userRole = this.userRoleRepository.create({
      user,
      role,
      assigned_by: assigedBy,
    });

    return this.userRoleRepository.save(userRole);
  }

  async findByUserAndRole(user: User, role: Role) {
    return this.userRoleRepository.findOne({
      where: {
        user: { user_id: user.user_id },
        role: { role_id: role.role_id },
      },
      relations: ['user', 'role'],
    });
  }

  async getAllRolesByUser(user: User) {
    return this.userRoleRepository.find({
      where: {
        user: { user_id: user.user_id },
        is_active: true,
      },
      relations: ['role'],
    });
  }

  async deactiveUserRole(userRole: UserRole) {
    userRole.is_active = false;
    return this.userRoleRepository.save(userRole);
  }
}

export default UserRoleRepository;
