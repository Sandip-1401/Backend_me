import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import type { MedicalRecord } from './medical_records.entities.js';
import type { Doctor } from './doctor.entities.js';
import type { Patient } from './patient.entities.js';
import type { PrescriptionMedicine } from './prescription_medicine.entities.js';

@Entity('prescription')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  prescription_id!: string;

  @OneToOne('MedicalRecord', { nullable: false })
  @JoinColumn({ name: 'medical_record_id' })
  medical_record!: MedicalRecord;

  @ManyToOne('Doctor', { nullable: false })
  @JoinColumn({ name: 'doctor_id' })
  doctor!: Doctor;

  @ManyToOne('Patient', 'prescriptions', { nullable: false })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  prescribed_date!: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany('PrescriptionMedicine', 'prescription')
  medicines!: PrescriptionMedicine[];
}
