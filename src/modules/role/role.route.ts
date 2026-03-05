import { Router } from "express";
import RoleController from "./role.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createRoleSchema } from "./role.validation";

const roleRoute = Router();
const roleController = new RoleController()

roleRoute.get("/", roleController.getAllRole);
roleRoute.post("/", validate(createRoleSchema), roleController.createRole)

export default roleRoute;