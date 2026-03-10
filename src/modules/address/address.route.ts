import { Router } from "express";
import { AddressController } from "./address.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";

const addressRoute = Router();

const addressController = new AddressController();

addressRoute.post("/", authMiddleware, asyncHandler(addressController.createAddres));

addressRoute.patch("/:addressId", authMiddleware, addressController.updateAddress);

export default addressRoute;