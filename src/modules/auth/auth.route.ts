import { Router } from "express";
import { login, refreshToken, register, logout } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoute = Router();

authRoute.post("/login", login);
authRoute.post("/register", register); 
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