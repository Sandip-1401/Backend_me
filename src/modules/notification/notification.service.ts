import { NotificationRepository } from "./notification.repository";
import { NotificationType } from "../../entities/notification.entities";

export class NotificationService {

  private notificationRepo = new NotificationRepository();

  async sendNotification(
    senderId: string,
    receiverId: string,
    title: string,
    message: string,
    type: NotificationType,
    referenceId?: string
  ) {

    const notification = await this.notificationRepo.createNotification({
      sender_id: senderId,
      receiver_id: receiverId,
      title,
      message,
      type,
      reference_id: referenceId
    });

    // future: socket emit here

    return notification;
  }

  async getUserNotifications(userId: string) {
    return await this.notificationRepo.getUserNotifications(userId);
  }

  async markNotificationAsRead(notificationId: string) {
    return await this.notificationRepo.markAsRead(notificationId);
  }

  async getUnreadCount(userId: string) {
    return await this.notificationRepo.getUnreadCount(userId);
  }

}