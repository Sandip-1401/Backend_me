import { AppError } from "../../common/errors/AppError";
import { OtpType } from "../../entities/otp-verification.entities";
import { OtpRepository } from "./otp.repository";

export class OtpService {

   private otpRepository = new OtpRepository();

   generateOTP(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
   }

   async createOTP(email: string, type: OtpType) {

      const otp: string = this.generateOTP();

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const existing = await this.otpRepository.findByEmail(email);

      if (existing) {
         existing.otp = otp,
         existing.expires_at = expiresAt;
         if(existing.type){
            existing.type = type;
         }
         await this.otpRepository.saveOTP(existing)
         return otp;
      }

      await this.otpRepository.createOTP({
         email,
         otp,
         expires_at: expiresAt,
         type: type
      });

      return otp;
   };

   async verifyOTP(email: string, otp: string) {


      const record = await this.otpRepository.findByEmail(email);

      if (!record) {
         throw new Error("OTP not found");
      }

      if (record.otp !== otp) {
         throw new Error("Invalid OTP");
      }

      if (record.expires_at < new Date()) {
         throw new Error("OTP expired");
      }

      return true;
   };

   async findByEmail(email: string) {
      return await this.otpRepository.findByEmail(email);
   }

   async isVerifyTrue(email: string, otp: string, type: OtpType){


      const otpRow = await this.otpRepository.findByEmailAndOtp(email, otp, type);

      if(!otpRow){
         throw new AppError(`${otp} for ${email} not found`, 404, "OTP-EMAIL_NOT_FOUND")
      }

      otpRow.is_verified = true;

      const verifiedOTPRow = await this.otpRepository.updateOtpIsVerify(email, otpRow)

      return {verifiedOTPRow, message: "marked as verified once"}
   }


   async deleteOTP(email: string) {
      await this.otpRepository.deleteOTP(email);
   };
}