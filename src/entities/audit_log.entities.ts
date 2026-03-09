import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import type { User } from './user.entities.js';

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  audit_id!: string;

  @ManyToOne('User', 'audit_logs', { nullable: true })
  @JoinColumn({ name: 'actor_user_id' })
  actor?: User;

  @Column({ type: 'enum', enum: AuditAction })
  action!: AuditAction;

  @Column({ type: 'varchar' })
  entity_name!: string;

  @Column({ type: 'uuid', nullable: true })
  entity_id?: string;

  @Column({ type: 'timestamp', nullable: true })
  action_time?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
