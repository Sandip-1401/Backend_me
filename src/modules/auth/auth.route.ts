import { Router } from "express";
import { login, refreshToken, register, logout } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

const authRoute = Router();

authRoute.post("/login", validate(loginSchema), asyncHandler(login));
authRoute.post("/register", validate(registerSchema), asyncHandler(register)); 
authRoute.post("/refresh-token", asyncHandler(refreshToken));
authRoute.post("/logout", asyncHandler(logout));

authRoute.get("/test", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route working",
    user: (req as any).user
  });
});   
export default authRoute