import { Router } from 'express';
import { login, refreshToken, register, logout, verifyOtp, resendOtp, forgotPassward, verifyResetPasswordOtp, resetPassword } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { loginSchema, registerSchema } from './auth.validation';
import { asyncHandler } from '../../common/utils/asyncHandler';

const authRoute = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user using email and password and return a JWT access token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: User login credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Registered user email
 *                 example: admin@system.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User account password
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */
authRoute.post('/login', validate(loginSchema), asyncHandler(login));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     description: Register a new user account with basic details like name, email, password, and optional phone number.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: User registration data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: Sandip Sonagra
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: sandip@example.com
 *               password:
 *                 type: string
 *                 description: User account password (minimum 6 characters)
 *                 example: password123
 *               phone_number:
 *                 type: string
 *                 description: User phone number (10 digits)
 *                 example: "9876543210"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

authRoute.post('/register', validate(registerSchema), asyncHandler(register));

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Generate a new access token using a valid refresh token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: Refresh token used to obtain a new access token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: Valid refresh token issued during login
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *       401:
 *         description: Invalid or expired refresh token
 */

authRoute.post('/refresh-token', asyncHandler(refreshToken));

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the currently authenticated user by invalidating their session or token.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */

authRoute.post('/logout', authMiddleware, asyncHandler(logout));

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Register user by verifying OTP sent in your email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: User OTP verification 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: Sandip Sonagra
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: sandip@example.com
 *               password:
 *                 type: string
 *                 description: User account password (minimum 6 characters)
 *                 example: password123
 *               phone_number:
 *                 type: string
 *                 description: User phone number (10 digits)
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 description: User OTP (6 digits)
 *                 example: "987654"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       401:
 *         description: Invalid OTP
 */

authRoute.post(
  "/verify-otp",
  asyncHandler(verifyOtp)
);

/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     description: Resend OTP to email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: Resend OTP to email. 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: sandip@example.com
 *     responses:
 *       200:
 *         description: User registered successfully
 *       401:
 *         description: Invalid OTP
 */

authRoute.post("/resend-otp", asyncHandler(resendOtp));

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send OTP to user's registered email for password reset.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: User email to receive OTP
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Registered email of the user
 *                 example: sandip@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation error
 */

authRoute.post("/forgot-password", asyncHandler(forgotPassward))

/**
 * @swagger
 * /api/auth/verify-reset-password-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     description: Verify OTP sent to user's email before allowing password reset.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: Email and OTP for verification
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Registered email of the user
 *                 example: sandip@example.com
 *               otp:
 *                 type: string
 *                 description: OTP received on email
 *                 example: "482931"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: OTP not found
 */

authRoute.post("/verify-reset-password-otp", asyncHandler(verifyResetPasswordOtp))
//if error check for otp type you know...!!

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Reset password after OTP verification.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       description: New password details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Registered email of the user
 *                 example: sandip@example.com
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: newpassword123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm new password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Password mismatch or validation error
 *       404:
 *         description: User not found
 */

authRoute.post("/reset-password", asyncHandler(resetPassword))

authRoute.get('/test', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected route working',
    user: (req as any).user,
  });
});
export default authRoute;
