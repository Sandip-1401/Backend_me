import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import type{ Patient } from "./patient.entities.js";
import type{ Doctor } from "./doctor.entities.js";
import type{ Appointment } from "./appointment.entities.js";

@Entity("medical_records")
export class MedicalRecord {
  @PrimaryGeneratedColumn("uuid")
  medical_record_id!: string;

  @ManyToOne("Patient", "medical_records", { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "patient_id" })
  patient!: Patient;

  @ManyToOne("Doctor", "medical_records", { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @OneToOne("Appointment", { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "appointment_id" })
  appointment!: Appointment;

  @Column({ type: "text" })
  diagnosis!: string;

  @Column({ type: "text", nullable: true })
  notes!: string;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  record_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
