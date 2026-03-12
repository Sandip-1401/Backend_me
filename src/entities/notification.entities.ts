import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

export enum NotificationType {
  APPOINTMENT = "APPOINTMENT",
  PAYMENT = "PAYMENT",
  SYSTEM = "SYSTEM"
}

@Entity("notifications")
export class Notification {

  @PrimaryGeneratedColumn("uuid")
  notification_id!: string;

  @Column({ type: "uuid" })
  sender_id!: string;

  @Column({ type: "uuid" })
  receiver_id!: string;

  @Column({ type: "varchar", length: 150 })
  title!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({
    type: "enum",
    enum: NotificationType
  })
  type!: NotificationType;

  @Column({ type: "uuid", nullable: true })
  reference_id!: string;

  @Column({ type: "boolean", default: false })
  is_read!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

}