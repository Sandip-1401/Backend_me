import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";

const notificationRoute = Router();
const notificationController = new NotificationController();

// get all notifications of logged in user
notificationRoute.get(
  "/",
  authMiddleware,
  asyncHandler(notificationController.getMyNotifications)
);

// mark notification as read
notificationRoute.patch(
  "/:id/read",
  authMiddleware,
  asyncHandler(notificationController.markAsRead)
);

// unread notification count
notificationRoute.get(
  "/unread-count",
  authMiddleware,
  asyncHandler(notificationController.getUnreadCount)
);

export default notificationRoute;