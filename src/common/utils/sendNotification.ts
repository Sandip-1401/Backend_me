import { NotificationService } from "../../modules/notification/notification.service";
import { NotificationType } from "../../entities/notification.entities";

const notificationService = new NotificationService();

export const sendNotification = async (
  senderId: string,
  receiverId: string,
  title: string,
  message: string,
  type: NotificationType,
  referenceId?: string
) => {
  return notificationService.sendNotification(
    senderId,
    receiverId,
    title,
    message,
    type,
    referenceId
  );
};