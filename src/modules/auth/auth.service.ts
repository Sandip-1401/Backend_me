import { AppError } from '../../common/errors/AppError';
import { AppDataSource } from '../../config/datasource';
import { NotificationType } from '../../entities/notification.entities';
import { RefreshToken } from '../../entities/refresh_token.entity';
import UserRoleRepository from '../user-role/user_role.repository';
import { LoginDto, RegisterDto, VerifyOTPDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { sendNotification } from '../../common/utils/sendNotification';
import { OtpService } from "../otp/otp.service";
import { EmailService } from '../../common/services/email.service';

export class AuthService {
  private authRepository = new AuthRepository();
  private userRoleRepository = new UserRoleRepository();
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  private otpService = new OtpService();
  private emailService = new EmailService();

  async login(dto: LoginDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);

    if (!isMatch) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new AppError('JWT_SECRET_KEY not defined', 500, 'JWT_SECRET_NOT_DEFINED');
    }

    const accessToken = Jwt.sign({ user_id: user.user_id }, secretKey, { expiresIn: '15m' });

    const refreshToken = Jwt.sign({ user_id: user.user_id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });

    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      user: user,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { user, accessToken, refreshToken };
  }

  async register(dto: RegisterDto) {

    const existingUser = await this.authRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError('Email already exists', 401, 'EMAIL_EXISTS');
    }

    const otp = await this.otpService.createOTP(dto.email);

    await this.emailService.sendOTP(dto.email, otp);

    return {
      message: "OTP sent to your email"
    };

    // const hashedPassword = await bcrypt.hash(dto.password, 10);

    // const user = await this.authRepository.createUser({
    //   name: dto.name,
    //   email: dto.email,
    //   password_hash: hashedPassword,
    //   phone_number: dto.phone_number,
    // });

    //  const admins = await this.userRoleRepository.findAdminUsers();

    //   for (const admin of admins) {
    //     await sendNotification(
    //       user.user_id,
    //       admin.user.user_id,
    //       "New User Registered",
    //       `New user ${user.name} has registered`,
    //       NotificationType.SYSTEM
    //     );
    //   }

    // return user;
  };


  async verifyOtp(dto: VerifyOTPDto) {

    const isValid = await this.otpService.verifyOTP(dto.email, dto.otp);

    if (!isValid) {
      throw new AppError("Invalid or expired OTP", 400, "INVALID_OTP");
    }

    const existingUser = await this.authRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError("Email already exists", 400, "EMAIL_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.authRepository.createUser({
      name: dto.name,
      email: dto.email,
      password_hash: hashedPassword,
      phone_number: dto.phone_number,
    });

    await this.otpService.deleteOTP(dto.email);

    const admins = await this.userRoleRepository.findAdminUsers();

    for (const admin of admins) {
      await sendNotification(
        user.user_id,
        admin.user.user_id,
        "New User Registered",
        `New user ${user.name} has registered`,
        NotificationType.SYSTEM
      );
    }

    return user;

  }

  async resendOtp(email: string){
    const existingOtp = await this.otpService.findByEmail(email);

    if(!existingOtp)  throw new AppError("OTP request not found", 404, "OTP_NOT_FOUND");

    const diff = Date.now() - new Date(existingOtp.created_at).getTime();

    if(diff < 60000){
       throw new AppError(
        "Please wait before requesting another OTP",
        400,
        "OTP_COOLDOWN"
      );
    }

    const newOtp = await this.otpService.createOTP(email);

    await this.emailService.sendOTP(email, newOtp);

    return {email};
  }

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError('Refresh Token Required', 401, 'REFRESH_TOKEN_REQUIRED');
    }

    let decoded: any;

    try {
      decoded = Jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    const refreshTokenEntity = await this.authRepository.findUserByRefreshToken(refreshToken);

    if (!refreshTokenEntity) {
      throw new AppError('Refresh token not found', 401, 'REFRESH_TOKEN_NOT_FOUND');
    }

    if (refreshTokenEntity.expires_at < new Date()) {
      throw new AppError('Refresh token expired', 401, 'REFRESH_TOKEN_EXPIRED');
    }

    const newAccessToken = Jwt.sign({ user_id: decoded.user_id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '15m',
    });

    return { accessToken: newAccessToken };
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError('Refresh Token required', 401, 'REFRESH_TOKEN_REQUIRED');
    }

    const user = await this.authRepository.findUserByRefreshToken(refreshToken);

    if (!user) throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');

    await this.authRepository.deleteRefreshToken(refreshToken);

    return { message: 'Logged out successfully' };
  }
}
