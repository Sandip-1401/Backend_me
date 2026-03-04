import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import { LoginDto, RegisterDto } from "./auth.dto"

const authService = new AuthService()

export const login = async (req: Request, res: Response) => {

   const dto: LoginDto = req.body;
   const { user, accessToken, refreshToken } = await authService.login(dto);
   res.status(200).json({
      success: true,
      message: "Login Successfully!",
      data: {
         user_id: user.user_id,
         email: user.email,
         accessToken: accessToken,
         refreshToken: refreshToken
      }
   })

}

export const register = async (req: Request, res: Response) => {

   const dto: RegisterDto = req.body;
   const user = await authService.register(dto);
   res.status(201).json({
      success: true,
      message: "User Register Successfully!",
      // data: {
      //    user_id: user.user_id,
      //    email: user.email,
      // }
      data: user
   })

}


export const refreshToken = async (req: Request, res: Response) => {
   const { refreshToken } = req.body;

   const result = await authService.refreshAccessToken(refreshToken);

   return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: result
   });

};


export const logout = async (req: Request, res: Response) => {

   const { refreshToken } = req.body;

   await authService.logout(refreshToken);

   return res.status(200).json({
      success: true,
      message: "Logged out successfully"
   });

};