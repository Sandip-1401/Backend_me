import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const paymentRoute = Router();
const paymentController = new PaymentController();

paymentRoute.get("/qr/:billId", authMiddleware, paymentController.generateQR);

paymentRoute.post("/pay/:billId", authMiddleware, paymentController.payBill);

export default paymentRoute;