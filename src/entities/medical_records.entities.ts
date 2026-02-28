import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type{ Patient } from "./patient.entities.js";
import type{ Doctor } from "./doctor.entities.js";
import type{ Appointment } from "./appointment.entities.js";

@Entity("medical_records")
export class MedicalRecord {
  @PrimaryGeneratedColumn("uuid")
  medical_record_id!: string;

  @ManyToOne("Patient", "medical_records", { nullable: false })
  @JoinColumn({ name: "patient_id" })
  patient!: Patient;

  @ManyToOne("Doctor", "medical_records", { nullable: false })
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @ManyToOne("Appointment", { nullable: true })
  @JoinColumn({ name: "appointment_id" })
  appointment?: Appointment;

  @Column({ type: "text" })
  diagnosis!: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "date" })
  record_date!: Date;
}
