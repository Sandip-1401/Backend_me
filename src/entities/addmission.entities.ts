import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Patient } from './patient.entities.js';
import type { Doctor } from './doctor.entities.js';
import type { Room } from './room.entities.js';

export enum AdmissionStatus {
  ADMITTED = 'ADMITTED',
  DISCHARGED = 'DISCHARGED',
  CANCELLED = 'CANCELLED',
}

@Entity('admission')
export class Admission {
  @PrimaryGeneratedColumn('uuid')
  admission_id!: string;

  @ManyToOne('Patient', 'admissions', { nullable: false })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @ManyToOne('Doctor', 'admissions', { nullable: false })
  @JoinColumn({ name: 'doctor_id' })
  doctor!: Doctor;

  @ManyToOne('Room', 'admissions', { nullable: true })
  @JoinColumn({ name: 'room_id' })
  room?: Room;

  @Column({ type: 'timestamp' })
  admission_date!: Date;

  @Column({ type: 'timestamp', nullable: true })
  discharge_date?: Date;

  @Column({ type: 'enum', enum: AdmissionStatus })
  status!: AdmissionStatus;
}
