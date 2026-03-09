import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Prescription } from './prescription.entities.js';

@Entity('prescription_medicine')
export class PrescriptionMedicine {
  @PrimaryGeneratedColumn('uuid')
  prescription_medicine_id!: string;

  @ManyToOne('Prescription', 'medicines', { nullable: false })
  @JoinColumn({ name: 'prescription_id' })
  prescription!: Prescription;

  @Column({ type: 'varchar', length: 255 })
  medicine_name!: string;

  @Column({ type: 'varchar', length: 100 })
  dosage!: string;

  @Column({ type: 'varchar', length: 100 })
  frequency!: string;

  @Column({ type: 'int' })
  duration_days!: number;
}
