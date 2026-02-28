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
} from "typeorm";
import type{ User } from "./user.entities.js";
import type{ UserRole } from "./user_role.entities.js";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  role_id!: string;

  @Column({ type: "varchar", unique: true })
  role_name!: string; // ADMIN | DOCTOR | PATIENT

  @Column({ type: "varchar", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at?: Date;

  @ManyToOne("User", { nullable: true })
  @JoinColumn({ name: "created_by" })
  created_by?: User;

  @ManyToOne("User", { nullable: true })
  @JoinColumn({ name: "updated_by" })
  updated_by?: User;

  @OneToMany("UserRole", "role")
  user_roles!: UserRole[];
}
