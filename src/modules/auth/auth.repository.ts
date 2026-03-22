import { AppError } from '../../common/errors/AppError';
import { AppDataSource } from '../../config/datasource';
import { RefreshToken } from '../../entities/refresh_token.entity';
import { User } from '../../entities/user.entities';
import { UserRole } from '../../entities/user_role.entities';

export class AuthRepository {
  private authRepository = AppDataSource.getRepository(User);
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  private userRoleRepository = AppDataSource.getRepository(UserRole);

  async createUser(data: Partial<User>) {
    const user = this.authRepository.create(data);
    return await this.authRepository.save(user);
  }

  async findByEmail(email: string) {
     console.log(`enter findByEmail`)
    return this.authRepository.findOne({
      where: { email: email },
    });
  }

  async findUserByRefreshToken(refreshToken: string) {
    return this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });
  };

  async findByUserId(userId: string){
    const user = await this.authRepository.findOne({
      where: {user_id: userId}
    })
    return user;
  }

  async findRoleByUserId(userId: string) {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        user: {
          user_id: userId
        }
      },
      relations: ["role"]
    });

    const role = userRole?.role.role_name

    return role;
  }

  async updateUserPassword(email: string, data: Partial<User>){

    const userRow = await this.authRepository.findOne({
      where: {email: email}
    })

    if(!userRow) throw new AppError("User not ound", 404, "USER_NOT_FOUND");

    const user_id = String(userRow.user_id)

    // const user = await this.authRepository.findOne({
    //   where: {
    //     user_id: user_id
    //   }
    // });

    // if(!user) throw new AppError("Email user not found", 404, "EMAIL_USER_NOT_FOUND")

    return await this.authRepository.update(user_id, data);
  
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.refreshTokenRepository.delete({
      token: refreshToken,
    });
  }
}
