import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Doctor } from './doctor.entities.js';

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Entity('doctor_scheduling')
export class DoctorScheduling {
  @PrimaryGeneratedColumn('uuid')
  schedule_id!: string;

  @ManyToOne('Doctor', 'schedules', { nullable: false })
  @JoinColumn({ name: 'doctor_id' })
  doctor!: Doctor;

  @Column({ type: 'enum', enum: DayOfWeek })
  day_of_week!: DayOfWeek;

  @Column({ type: 'time' })
  start_time!: string;

  @Column({ type: 'time' })
  end_time!: string;

  @Column({ type: 'int' })
  slot_duration_minutes!: number;

  @Column({ type: 'int', nullable: true })
  max_patients?: number;
}
