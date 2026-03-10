import { Router } from "express";
import { AddressController } from "./address.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { requireRole } from "../../middlewares/role.middleware";

const addressRoute = Router();

const addressController = new AddressController();

addressRoute.post("/", authMiddleware, requireRole(["PATIENT", "DOCTOR"]), asyncHandler(addressController.createAddres));

addressRoute.patch("/:addressId", authMiddleware, requireRole(["PATIENT", "DOCTOR"]), addressController.updateAddress);

export default addressRoute;