import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Bill } from './bill.entities.js';
import type { Patient } from './patient.entities.js';

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id!: string;

  @Column({ type: 'varchar', nullable: true })
  transaction_id?: string;

  @ManyToOne('Bill', 'payments', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bill_id' })
  bill!: Bill;

  @ManyToOne('Patient', 'payments', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date!: Date;

  @Column({ type: 'varchar' })
  payment_method!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  status!: PaymentStatus;
}
