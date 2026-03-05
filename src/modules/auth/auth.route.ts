import { Router } from "express";
import { login, refreshToken, register, logout } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validation";

const authRoute = Router();

authRoute.post("/login", validate(loginSchema), login);
authRoute.post("/register", validate(registerSchema), register); 
authRoute.post("/refresh-token", refreshToken);
authRoute.post("/logout", logout);

authRoute.get("/test", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route working",
    user: (req as any).user
  });
});   
export default authRoute