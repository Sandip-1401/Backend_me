import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity("otp_verifications")
export class OtpVerification {

  @PrimaryGeneratedColumn("uuid")
  otp_id!: string;

  @Column({type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", length: 6 })
  otp!: string;

  @Column({ type: "timestamp" })
  expires_at!: Date;

  @CreateDateColumn()
  created_at!: Date;
}