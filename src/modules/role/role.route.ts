import { Router } from "express";
import RoleController from "./role.controller";

const roleRoute = Router();
const roleController = new RoleController()

roleRoute.get("/", roleController.getAllRole);
roleRoute.post("/", roleController.createRole)

export default roleRoute;