import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, VerifyOTPDto } from './auth.dto';
import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';

const authService = new AuthService();

export const login = async (req: AuthRequest, res: Response) => {
  const dto: LoginDto = req.body;
  const { user, accessToken, refreshToken } = await authService.login(dto);
  const data = {
    user_id: user.user_id,
    email: user.email,
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
  
  const {email} = req.body;

  const result = await authService.resendOtp(email);

  return successResponse(res, "OTP sent successfully", result)
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
