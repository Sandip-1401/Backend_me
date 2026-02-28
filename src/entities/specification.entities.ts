import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type{ User } from "./user.entities.js";

@Entity("specification")
export class Specification {
  @PrimaryGeneratedColumn("uuid")
  specification_id!: string;

  @Column({ type: "varchar", unique: true })
  specification_name!: string;

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
}
