import { Router } from "express";
import { AdminController } from "./admin.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { requireRole } from "../../middlewares/role.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const adminRoute = Router();

const adminController = new AdminController();

adminRoute.get("/pending-doctors", authMiddleware, requireRole("ADMIN"), asyncHandler(adminController.getPendingDoctors));
adminRoute.patch("/active-doctor/:id", authMiddleware, asyncHandler(adminController.activedoctorById));
adminRoute.get("/unverified-users", authMiddleware, asyncHandler(adminController.unverifiedUser));
adminRoute.patch("/verify-user/:id", authMiddleware, asyncHandler(adminController.verifyUserById));
export default adminRoute;