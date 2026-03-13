import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 100
});

export const loginLimiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 5,
   message: {
      success: false,
      message: "Too many login attempts. Please try again later."
   }
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many OTP attempts. Please try again later."
  }
});