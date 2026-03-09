import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Index } from 'typeorm';
import type { Patient } from './patient.entities.js';
import type { Doctor } from './doctor.entities.js';
import type { AppointmentStatus } from './appointment_status.entities.js';

// @Index(
//   ["doctor", "appointment_date", "appointment_time"],
//   { unique: true }
// )

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  appointment_id!: string;

  @ManyToOne('Patient', 'appointments', { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @ManyToOne('Doctor', 'appointments', { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'doctor_id' })
  doctor!: Doctor;

  @ManyToOne('AppointmentStatus', 'appointments', { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status!: AppointmentStatus;

  @Column({ type: 'date' })
  appointment_date!: Date;

  @Column({ type: 'time' })
  appointment_time!: string;

  @Column({ type: 'varchar', nullable: true })
  reason?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at?: Date;
}
