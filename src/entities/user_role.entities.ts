import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import type{ User } from "./user.entities.js";
import type{ Role } from "./roles.entities.js";

@Entity("user_role")
@Index(["user", "role"], { unique: true }) // (user_id, role_id) unique
export class UserRole {
  @PrimaryGeneratedColumn("uuid")
  user_role_id!: string;

  @ManyToOne("User", "user_roles", { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne("Role", "user_roles", { nullable: false })
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @ManyToOne("User", { nullable: true })
  @JoinColumn({ name: "assigned_by" })
  assigned_by?: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  assigned_at!: Date;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at?: Date;
}
