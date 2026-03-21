import { AppDataSource } from "../../config/datasource";
import { Notification } from "../../entities/notification.entities";

export class NotificationRepository {

  private notificationRepository = AppDataSource.getRepository(Notification);

  async createNotification(data: Partial<Notification>) {
    const notification = this.notificationRepository.create(data);
    return await this.notificationRepository.save(notification);
  }

  async getUserNotifications(receiverId: string) {
    return await this.notificationRepository.find({
      where: { receiver_id: receiverId },
      order: { created_at: "DESC" }
    });
  }

  // mark notification as read
  async markAsRead(notificationId: string) {
    return await this.notificationRepository.update(
      { notification_id: notificationId },
      { is_read: true }
    );
  }

  // unread count (frontend bell icon)
  async getUnreadCount(receiverId: string) {
    return await this.notificationRepository.count({
      where: {
        receiver_id: receiverId,
        is_read: false
      }
    });
  }

}