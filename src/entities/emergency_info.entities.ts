import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Patient } from './patient.entities.js';

@Entity('emergency_info')
export class EmergencyInfo {
  @PrimaryGeneratedColumn('uuid')
  emergency_id!: string;

  @ManyToOne('Patient', 'emergency_contacts', { nullable: false })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @Column({ type: 'varchar' })
  contact_name!: string;

  @Column({ type: 'varchar' })
  relation!: string;

  @Column({ type: 'varchar' })
  contact_phone!: string;
}
