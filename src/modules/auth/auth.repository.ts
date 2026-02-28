import { AppDataSource } from "../../config/datasource";
import { User } from "../../entities/user.entities";

export class AuthRepository{
   private authRepository = AppDataSource.getRepository(User);

   async createUser(data: Partial<User>){
      const user = this.authRepository.create(data);
      return await this.authRepository.save(user);
   }

   async findByEmail(email: string){
      return this.authRepository.findOne({
         where: {email}
      })
   }
}