import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";

const notificationRoute = Router();
const notificationController = new NotificationController();

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get my notifications
 *     description: Retrieve all notifications for the currently authenticated user.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */

notificationRoute.get(
  "/",
  authMiddleware,
  asyncHandler(notificationController.getMyNotifications)
);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     description: Mark a specific notification as read for the authenticated user.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Notification ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       404:
 *         description: Notification not found
 */
notificationRoute.patch(
  "/:id/read",
  authMiddleware,
  asyncHandler(notificationController.markAsRead)
);

/**
 * @swagger
 * /api/notifications/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     description: Retrieve the total number of unread notifications for the authenticated user.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification count fetched successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */
notificationRoute.get(
  "/unread-count",
  authMiddleware,
  asyncHandler(notificationController.getUnreadCount)
);

export default notificationRoute;