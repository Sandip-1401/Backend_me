import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { successResponse } from "../../common/utils/successResponse";
import { NotificationService } from "./notification.service";
import { AppError } from "../../common/errors/AppError";

export class NotificationController {

  private notificationService = new NotificationService();

  getMyNotifications = async (req: AuthRequest, res: Response) => {

    if (!req.user?.user_id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const userId = req.user.user_id;

    const notifications = await this.notificationService.getUserNotifications(userId);

    return successResponse(res, "User notifications fetched successfully", notifications);
  };

  markAsRead = async (req: AuthRequest, res: Response) => {

    const { id } = req.params;

    const result = await this.notificationService.markNotificationAsRead(String(id));

    return successResponse(res, "Notification marked as read", result);
  };

  getUnreadCount = async (req: AuthRequest, res: Response) => {

    if (!req.user?.user_id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const userId = req.user.user_id;

    const count = await this.notificationService.getUnreadCount(userId);

    return successResponse(res, "Unread notification count", count);
  };

}