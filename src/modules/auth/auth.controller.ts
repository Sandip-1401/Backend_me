import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, VerifyOTPDto } from './auth.dto';
import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { OtpType } from '../../entities/otp-verification.entities';

const authService = new AuthService();

export const login = async (req: AuthRequest, res: Response) => {
  const dto: LoginDto = req.body;
  const { user, role, accessToken, refreshToken } = await authService.login(dto);
  const data = {
    user_id: user.user_id,
    email: user.email,
    role: role,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return successResponse(res, 'Login Successfully!', data);
};

export const register = async (req: AuthRequest, res: Response) => {
  const dto: RegisterDto = req.body;
  const user = await authService.register(dto);
  return successResponse(res, "OTP sent to your email", user);
};

export const verifyOtp = async (req: Request, res: Response) => {

  const dto: VerifyOTPDto = req.body;

  const result = await authService.verifyOtp(dto);

  return successResponse(res, "User Registered Successfully!", result);

};

export const resendOtp = async (req: AuthRequest, res: Response) => {
  
  const { email } = req.body;

  const result = await authService.resendOtp(email);

  return successResponse(res, "OTP sent successfully", result)
};

export const forgotPassward = async (req: AuthRequest, res: Response) => {

  const { email } = req.body;

  const result = await authService.forgotPassward(email);

  return successResponse(res, "OTP sent your registered email", result);
};

export const verifyResetPasswordOtp = async (req: AuthRequest, res: Response) => {

  const email = String(req.body.email);
  const otp = String(req.body.otp);

  const result = await authService.verifyResetPasswordOtp(email, otp, OtpType.PASSWORD_RESET);

  return successResponse(res, "OTP verified now you can reset you password", result);
}

export const resetPassword = async (req: AuthRequest, res: Response) => {

  const email = String(req.body.email);
  const password = String(req.body.password);
  const confirmPassword = String(req.body.confirmPassword)

  const result = await authService.resetPassword(email, password, confirmPassword);

  return successResponse(res, "Password reset successfully", result)
}

export const refreshToken = async (req: AuthRequest, res: Response) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshAccessToken(refreshToken);

  return successResponse(res, 'Access token refreshed', result);
};

export const logout = async (req: AuthRequest, res: Response) => {
  const { refreshToken } = req.body;

  await authService.logout(refreshToken);

  return successResponse(res, 'Log out successfully');
};
