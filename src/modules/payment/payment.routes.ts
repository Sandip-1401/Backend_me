import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const paymentRoute = Router();
const paymentController = new PaymentController();

paymentRoute.get("/qr/:billId", authMiddleware, requireRole(["DOCTOR"]), paymentController.generateQR);

paymentRoute.post("/pay/:billId", authMiddleware, requireRole(["PATIENT"]), paymentController.payBill);

export default paymentRoute;