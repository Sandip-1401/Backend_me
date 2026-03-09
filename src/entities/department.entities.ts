import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import type { User } from './user.entities.js';
import type { Doctor } from './doctor.entities.js';
import type { Staff } from './staff.entities.js';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  department_id!: string;

  @Column({ type: 'varchar', unique: true })
  department_name!: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by?: User;

  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by?: User;

  @OneToMany('Doctor', 'department')
  doctors!: Doctor[];

  @OneToMany('Staff', 'department')
  staff_members!: Staff[];
}
