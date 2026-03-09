import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { User } from './user.entities.js';
import type { Department } from './department.entities.js';

export enum StaffType {
  NURSE = 'NURSE',
  RECEPTIONIST = 'RECEPTIONIST',
  ADMIN = 'ADMIN',
}

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staff_id!: string;

  @ManyToOne('User', { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne('Department', 'staff_members', { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @Column({ type: 'enum', enum: StaffType })
  staff_type!: StaffType;

  @Column({ type: 'varchar', nullable: true })
  contact_number?: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;
}
