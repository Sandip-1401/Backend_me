import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthRepository } from "./auth.repository";
import bcrypt from  "bcrypt";
import Jwt  from "jsonwebtoken";

export class AuthService{
   private authRepository = new AuthRepository();

   async login(dto: LoginDto){
      const user = await this.authRepository.findByEmail(dto.email);
      if(!user){
         throw new Error("Invalid email or password");
      }
      
      const isMatch = await bcrypt.compare(dto.password, user.password_hash);

      if(!isMatch){
         throw new Error("Invalid email or password")
      }  

      const secretKey = process.env.JWT_SECRET_KEY;

      if(!secretKey){
         throw new Error("JWT_SECRET_KEY not defined")
      }

      const token = Jwt.sign(
         {user_id: user.user_id},
         secretKey,
         {expiresIn: "1d"}
      )

      return {user, token};
   }

   async register(dto: RegisterDto){
      const existingUser = await this.authRepository.findByEmail(dto.email);
      if(existingUser){
         throw new Error("Email already exist!");
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      
      const user = await this.authRepository.createUser({
         email: dto.email,
         password_hash: hashedPassword,
      })
      return user;
   }
}

