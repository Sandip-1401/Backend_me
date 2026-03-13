import { AppDataSource } from "../../config/datasource";
import { OtpType, OtpVerification } from "../../entities/otp-verification.entities";

export class OtpRepository {

   private otpRepository = AppDataSource.getRepository(OtpVerification);

   async findByEmail(email: string) {
           console.log(`enter findByEmail`)

      return await this.otpRepository.findOne({
         where: { email: email }
      });
   }

   async createOTP(data: Partial<OtpVerification>) {
      const otp = this.otpRepository.create(data);
      return await this.otpRepository.save(otp);
   }

   async findByEmailAndOtp(email: string, otp: string, type: OtpType){
    console.log(`enter findByEmailAndOtp`)
      return await this.otpRepository.findOne({
         where: {
            email: email,
            otp: otp,
            type: type
         }
      })
   }

   async updateOtpIsVerify(email: string, data: Partial<OtpVerification>){
      console.log(`enter updateOtpIsVerify`)
      const row = await this.otpRepository.findOne({
         where: {
            email: email,
            otp: data.otp
         }
      });

      const otp_id = String(row?.otp_id)

      return await this.otpRepository.update(otp_id, data);
   }

   async saveOTP(otp: OtpVerification) {
      return await this.otpRepository.save(otp);
   }

   async deleteOTP(email: string) {
      return await this.otpRepository.delete({ email });
   }
}