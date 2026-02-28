import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import type{ User } from "./user.entities.js";
import type{ Department } from "./department.entities.js";
import type{ Address } from "./address.entities.js";
import type{ DoctorScheduling } from "./doctor_scheduling.entities.js";
import type{ Appointment } from "./appointment.entities.js";
import type{ MedicalRecord } from "./medical_records.entities.js";
import type{ Admission } from "./addmission.entities.js";

export enum DoctorStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

@Entity("doctor")
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  doctor_id!: string;

  @ManyToOne("User", { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne("Department", "doctors", { nullable: false })
  @JoinColumn({ name: "department_id" })
  department!: Department;

  @ManyToOne("Address", { nullable: true })
  @JoinColumn({ name: "address_id" })
  address?: Address;

  @Column({ type: "varchar", unique: true })
  registration_number!: string;

  @Column({ type: "varchar" })
  qualification!: string;

  @Column({ type: "int" })
  experience_years!: number;

  @Column({ type: "decimal", nullable: true })
  consultation_fee?: number;

  @Column({ type: "boolean", default: true })
  is_available!: boolean;

  @Column({ type: "enum", enum: DoctorStatus })
  status!: DoctorStatus;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at?: Date;

  @OneToMany("DoctorScheduling", "doctor")
  schedules!: DoctorScheduling[];

  @OneToMany("Appointment", "doctor")
  appointments!: Appointment[];

  @OneToMany("MedicalRecord", "doctor")
  medical_records!: MedicalRecord[];

  @OneToMany("Admission", "doctor")
  admissions!: Admission[];
}
