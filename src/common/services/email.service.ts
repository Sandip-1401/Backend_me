import nodemailer from "nodemailer";

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  async sendOTP(email: string, otp: string) {

    await this.transporter.sendMail({
      from: `"MyHealthcare" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code - MyHealthcare",
      html:   `
         <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        
         <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px;">
            
            <h2 style="text-align:center; color:#2c3e50;">
               MyHealthcare OTP Verification
            </h2>

            <p style="text-align:center; color:#555;">
               Use the following OTP to complete your registration
            </p>

            <div style="text-align:center; margin:30px 0;">
               <span style="
               font-size:32px;
               letter-spacing:5px;
               font-weight:bold;
               background:#ecf0f1;
               padding:10px 20px;
               border-radius:6px;
               display:inline-block;
               ">
               ${otp}
               </span>
            </div>

            <p style="text-align:center; color:#777;">
               This OTP will expire in <b>5 minutes</b>.
            </p>

            <hr style="margin:20px 0;"/>

            <p style="font-size:12px; text-align:center; color:#999;">
               If you did not request this OTP, please ignore this email.
            </p>

         </div>

      </div>
      `
    });

  }

}