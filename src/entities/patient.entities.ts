import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import type { User } from './user.entities.js';
import type { Address } from './address.entities.js';
import type { Appointment } from './appointment.entities.js';
import type { MedicalRecord } from './medical_records.entities.js';
import type { Prescription } from './prescription.entities.js';
import type { Bill } from './bill.entities.js';
import type { Payment } from './payment.entities.js';
import type { Admission } from './addmission.entities.js';
import type { EmergencyInfo } from './emergency_info.entities.js';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum PatientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DECEASED = 'DECEASED',
}

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  patient_id!: string;

  @OneToOne('User', { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne('Address', { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address?: Address;

  @Column({ type: 'varchar', nullable: true })
  blood_group?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight?: number;

  @Column({ type: 'enum', enum: PatientStatus, default: PatientStatus.ACTIVE })
  status!: PatientStatus;

  @OneToMany('Appointment', 'patient')
  appointments!: Appointment[];

  @OneToMany('MedicalRecord', 'patient')
  medical_records!: MedicalRecord[];

  @OneToMany('Prescription', 'patient')
  prescriptions!: Prescription[];

  @OneToMany('Bill', 'patient')
  bills!: Bill[];

  @OneToMany('Payment', 'patient')
  payments!: Payment[];

  @OneToMany('Admission', 'patient')
  admissions!: Admission[];

  @OneToMany('EmergencyInfo', 'patient')
  emergency_contacts!: EmergencyInfo[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
