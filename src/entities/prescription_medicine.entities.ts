import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type{ Prescription } from "./prescription.entities.js";

@Entity("prescription_medicine")
export class PrescriptionMedicine {
  @PrimaryGeneratedColumn("uuid")
  prescription_medicine_id!: string;

  @ManyToOne("Prescription", "medicines", { nullable: false })
  @JoinColumn({ name: "prescription_id" })
  prescription!: Prescription;

  @Column({type: "timestamp"})
  medicine_name!: string;

  @Column({type: "timestamp"})
  dosage!: string;

  @Column({type: "timestamp"})
  frequency!: string;

  @Column({ type: "int" })
  duration_days!: number;
}
