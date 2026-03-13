import { AppDataSource } from "../../config/datasource";
import { OtpVerification } from "../../entities/otp-verification.entities";

export class OtpRepository {

   private repository = AppDataSource.getRepository(OtpVerification);

   async findByEmail(email: string) {
      return await this.repository.findOne({
         where: { email }
      });
   }

   async createOTP(data: Partial<OtpVerification>) {
      const otp = this.repository.create(data);
      return await this.repository.save(otp);
   }

   async saveOTP(otp: OtpVerification) {
      return await this.repository.save(otp);
   }

   async deleteOTP(email: string) {
      return await this.repository.delete({ email });
   }
}