import { Router } from "express";
import { login, register } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoute = Router();

authRoute.post("/login", login);
authRoute.post("/register", register); 

authRoute.get("/test", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth middleware working",
    user: (req as any).user
  });
});   
export default authRoute