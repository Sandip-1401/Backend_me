import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import type{ Appointment } from "./appointment.entities.js";

export enum AppointmentStatusName {
  BOOKED = "BOOKED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
}

@Entity("appointment_status")
export class AppointmentStatus {
  @PrimaryGeneratedColumn("uuid")
  appointment_status_id!: string;

  @Column({
    type: "enum",
    enum: AppointmentStatusName,
    unique: true,
  })
  status_name!: AppointmentStatusName;

  @OneToMany("Appointment", "status")
  appointments!: Appointment[];
}
