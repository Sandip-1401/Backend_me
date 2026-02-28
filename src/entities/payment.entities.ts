import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type{ Bill } from "./bill.entities.js";
import type{ Patient } from "./patient.entities.js";

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

@Entity("payment")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  payment_id!: string;

  @ManyToOne("Bill", "payments", { nullable: false })
  @JoinColumn({ name: "bill_id" })
  bill!: Bill;

  @ManyToOne("Patient", "payments", { nullable: false })
  @JoinColumn({ name: "patient_id" })
  patient!: Patient;

  @Column({ type: "timestamp" })
  payment_date!: Date;

  @Column({type: "timestamp"})
  payment_method!: string;

  @Column({ type: "decimal" })
  amount!: number;

  @Column({ type: "enum", enum: PaymentStatus })
  status!: PaymentStatus;
}
