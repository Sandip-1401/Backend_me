import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import type{ Patient } from "./patient.entities.js";
import type{ Appointment } from "./appointment.entities.js";
import type{ BillItem } from "./bill_item.entities.js";
import type{ Payment } from "./payment.entities.js";

export enum BillStatus {
  PENDING = "PENDING",
  PAID = "PAID",
}

@Entity("bill")
export class Bill {
  @PrimaryGeneratedColumn("uuid")
  bill_id!: string;

  @ManyToOne("Patient", "bills", { nullable: false })
  @JoinColumn({ name: "patient_id" })
  patient!: Patient;

  @ManyToOne("Appointment", { nullable: true })
  @JoinColumn({ name: "appointment_id" })
  appointment?: Appointment;

  @Column({type: "varchar", unique: true })
  bill_number!: string;

  @Column({ type: "date" })
  bill_date!: Date;

  @Column({ type: "decimal" })
  total_amount!: number;

  @Column({ type: "decimal", nullable: true })
  discount_amount?: number;

  @Column({ type: "decimal" })
  net_amount!: number;

  @Column({ type: "enum", enum: BillStatus })
  status!: BillStatus;

  @OneToMany("BillItem", "bill")
  items!: BillItem[];

  @OneToMany("Payment", "bill")
  payments!: Payment[];
}
