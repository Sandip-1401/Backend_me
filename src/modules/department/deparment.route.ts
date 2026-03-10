import { Router } from "express";
import { DepartmentController } from "./department.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";

const departmentRoute = Router();

const deparmentController = new DepartmentController();

departmentRoute.post("/", authMiddleware, requireRole("ADMIN"), asyncHandler(deparmentController.createDepartment));

departmentRoute.patch("/:id", authMiddleware, requireRole("ADMIN"), asyncHandler(deparmentController.updateDepartment));

departmentRoute.delete("/:id", authMiddleware, requireRole("ADMIN"), asyncHandler(deparmentController.deleteDepartment));

export default departmentRoute;