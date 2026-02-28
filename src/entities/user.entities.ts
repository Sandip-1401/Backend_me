import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  ManyToOne, OneToMany, JoinColumn
} from "typeorm";
import type{ UserRole } from "./user_role.entities.js";
import type{ AuditLog } from "./audit_log.entities.js";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
  OTP = "OTP",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column({type: "varchar",  unique: true })
  email!: string;

  @Column({type: "varchar",  unique: true, nullable: true })
  phone_number?: string;

  @Column({type: "varchar"})
  password_hash!: string;

  @Column({ type: "timestamp", nullable: true })
  password_changed_at?: Date;

  @Column({ type: "enum", enum: UserStatus })
  status!: UserStatus;

  @Column({type: "boolean", default: true })
  is_active!: boolean;

  @Column({type: "boolean", default: false })
  is_verified!: boolean;

  @Column({ type: "timestamp", nullable: true })
  last_login_at?: Date;

  @Column({type: "int", default: 0 })
  failed_login_attempts!: number;

  @Column({ type: "timestamp", nullable: true })
  locked_until?: Date;

  @Column({ type: "enum", enum: AuthProvider, nullable: true })
  auth_provider?: AuthProvider;

  @CreateDateColumn({type: "timestamp"})
  created_at!: Date;

  @UpdateDateColumn({type: "timestamp", nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({type: "timestamp", nullable: true })
  deleted_at?: Date;

  /* self FK */
  @ManyToOne("User", "created_users", { nullable: true })
  @JoinColumn({ name: "created_by" })
  created_by?: User;

  @ManyToOne("User", "updated_users", { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updated_by?: User;

  @OneToMany("User", "created_by")
  created_users!: User[];

  @OneToMany("User", "updated_by")
  updated_users!: User[];

  @OneToMany("UserRole", "user")
  user_roles!: UserRole[];

  @OneToMany("AuditLog", "actor")
  audit_logs!: AuditLog[];
}
