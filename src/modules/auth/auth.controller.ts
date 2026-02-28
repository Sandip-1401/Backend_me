import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import { LoginDto, RegisterDto } from "./auth.dto"

const authService = new AuthService()

export const login = async (req: Request, res: Response) => {
   try{  
      const dto: LoginDto = req.body;
      const { user, token } = await authService.login(dto);
      res.status(200).json({
         success: true,
         message: "Login Successfully!",
         data: {
            user_id: user.user_id,
            email: user.email,
            token: token
         }  
      })
   }catch(err: any){
      res.status(401).json({
         success: false,
         message: err.message,
      })
   }
}

export const register = async (req: Request, res: Response) => {
   try{
      const dto: RegisterDto = req.body;
      const user = await authService.register(dto);
      res.status(201).json({
         success: true,
         message: "User Register Successfully!",
         data: {
            user_id: user.user_id,
            email: user.email,
         }
      })
   }catch(err: any){
      res.status(400).json({
         success: false,
         message: err.message
      })
   }
}
