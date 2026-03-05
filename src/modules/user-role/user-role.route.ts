import { Router } from "express";
import { UserRoleController } from "./user-role.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";

const userRoleRoute = Router();

const userRoleController = new UserRoleController();

userRoleRoute.get("/:userId", asyncHandler(userRoleController.getUserRole));
userRoleRoute.post("/assign", asyncHandler(userRoleController.assignRoleToUser));
userRoleRoute.delete("/revoke", asyncHandler(userRoleController.revokeUserRole));

export default userRoleRoute;