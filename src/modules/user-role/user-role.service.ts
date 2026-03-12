import { AppError } from '../../common/errors/AppError';
import { AppDataSource } from '../../config/datasource';
import { Role } from '../../entities/roles.entities';
import { User } from '../../entities/user.entities';
import UserRoleRepository from './user_role.repository';

export class UserRoleService {
  private userRoleRepository = new UserRoleRepository();
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);

  async assignRoleToUser(userId: string, roleId: string, assignedByUserId: string) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const role = await this.roleRepository.findOne({
      where: { role_id: roleId },
    });

    if (!role) {
      throw new AppError('Role not found', 404, 'ROLE_NOT_FOUND');
    }

    const existingRole = await this.userRoleRepository.findByUserAndRole(user, role);

    if (existingRole) {
      if (existingRole.deleted_at) {
        ((existingRole.deleted_at = null),
          (existingRole.is_active = true),
          (existingRole.updated_at = new Date()));
      }
      throw new AppError('User already has this role', 409, 'USER_ROLE_ALREADY_ASSIGNED');
    }

    let assignedBy: User | undefined;

    if (assignedByUserId) {
      assignedBy =
        (await this.userRepository.findOne({
          //findOne() ka return type hota hai: User | null....assignedBy MUST be User....agar null mila to kya karega?
          where: { user_id: assignedByUserId },
        })) ?? undefined;

      if (!assignedBy) {
        throw new AppError('AssignedBy user not found', 404, 'ASSIGNED_BY_USER_NOT_FOUND');
      }
    }

    return await this.userRoleRepository.assignRole(user, role, assignedBy);
  }

  async getByUserAndRole(user: User, role: Role) {
    const user1 = await this.userRepository.findOne({
      where: { user_id: user.user_id },
    });

    if (!user1) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const role1 = await this.roleRepository.findOne({
      where: { role_id: role.role_id },
    });

    if (!role1) {
      throw new AppError('Role not found', 404, 'ROLE_NOT_FOUND');
    }

    return await this.userRoleRepository.findByUserAndRole(user1, role1);
  }

  async deleteRole(userId: string, roleId: string) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const role = await this.roleRepository.findOne({
      where: { role_id: roleId },
    });

    if (!role) {
      throw new AppError('Role not found', 404, 'ROLE_NOT_FOUND');
    }

    const userRole = await this.userRoleRepository.findByUserAndRole(user, role);

    if (!userRole) {
      throw new AppError('User role not found', 404, 'USER_ROLE_NOT_FOUND');
    }

    return await this.userRoleRepository.deleteUserRole(user, role);
  }

  async getRolesByUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return await this.userRoleRepository.getAllRolesByUser(user);
  }
}
export default UserRoleService;
