import { AppDataSource } from '../config/datasource';
import { User, UserStatus } from '../entities/user.entities';
import { Role } from '../entities/roles.entities';
import { UserRole } from '../entities/user_role.entities';
import bcrypt from 'bcrypt';

export const createDefaultAdmin = async () => {
  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const userRoleRepo = AppDataSource.getRepository(UserRole);

  let adminRole = await roleRepo.findOne({
    where: { role_name: 'ADMIN' },
  });

  if (!adminRole) {
    adminRole = roleRepo.create({
      role_name: 'ADMIN',
      created_at: new Date(),
    });

    await roleRepo.save(adminRole);
    console.log('ADMIN role created');
  }

  let adminUser = await userRepo.findOne({
    where: { email: 'admin@system.com' },
  });

  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    adminUser = userRepo.create({
      email: 'admin@system.com',
      name: 'Admin',
      password_hash: hashedPassword,
      status: UserStatus.ACTIVE,
      is_active: true,
      phone_number: '0000000000',
      is_verified: true,
      created_at: new Date(),
    });

    await userRepo.save(adminUser);
  }

  const existingUserRole = await userRoleRepo.findOne({
    where: {
      user: { user_id: adminUser.user_id },
      role: { role_id: adminRole.role_id },
    },
    relations: ['user', 'role'],
  });

  if (!existingUserRole) {
    const userRole = userRoleRepo.create({
      user: adminUser,
      role: adminRole,
      assigned_at: new Date(),
      created_at: new Date(),
      is_active: true,
    });

    await userRoleRepo.save(userRole);
    console.log('ADMIN role assigned to default user');
  }
};
