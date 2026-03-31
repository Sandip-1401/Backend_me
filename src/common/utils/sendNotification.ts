import { NotificationService } from "../../modules/notification/notification.service";
import { NotificationType } from "../../entities/notification.entities";

const notificationService = new NotificationService();

export const sendNotification = async (
  senderId: string,
  receiverId: string,
  title: string,
  message: string,
  type: NotificationType,
  referenceId?: string,
  created_at?: Date
) => {
  return notificationService.sendNotification(
    senderId,
    receiverId,
    title,
    message,
    type,
    referenceId,
    created_at
  );
};