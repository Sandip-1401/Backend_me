import { Router } from "express";
import { UserRoleController } from "./user-role.controller";

const userRoleRoute = Router();

const userRoleController = new UserRoleController();

userRoleRoute.get("/:userId", userRoleController.getUserRole);
userRoleRoute.post("/assign", userRoleController.assignRoleToUser);
userRoleRoute.delete("/revoke", userRoleController.revokeUserRole);

export default userRoleRoute;