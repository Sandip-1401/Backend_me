import { AppDataSource } from '../../config/datasource';
import { RefreshToken } from '../../entities/refresh_token.entity';
import { User } from '../../entities/user.entities';

export class AuthRepository {
  private authRepository = AppDataSource.getRepository(User);
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  async createUser(data: Partial<User>) {
    const user = this.authRepository.create(data);
    return await this.authRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.authRepository.findOne({
      where: { email },
    });
  }

  async findUserByRefreshToken(refreshToken: string) {
    return this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.refreshTokenRepository.delete({
      token: refreshToken,
    });
  }
}
