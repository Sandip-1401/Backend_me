import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import type { Admission } from './addmission.entities.js';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  room_id!: string;

  @Column({ type: 'timestamp', unique: true })
  room_number!: string;

  @Column({ type: 'timestamp' })
  room_type!: string;

  @Column({ type: 'decimal', nullable: true })
  daily_charge?: number;

  @Column({ type: 'boolean', default: true })
  is_available!: boolean;

  @OneToMany('Admission', 'room')
  admissions!: Admission[];
}
