import { Router } from 'express';
import { login, refreshToken, register, logout } from './auth.controller';
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

authRoute.get('/test', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected route working',
    user: (req as any).user,
  });
});
export default authRoute;
