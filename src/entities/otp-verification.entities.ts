import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

export enum OtpType {
  REGISTER = "REGISTER",
  PASSWORD_RESET = "PASSWORD_RESET"
}

@Entity("otp_verifications")
export class OtpVerification {

  @PrimaryGeneratedColumn("uuid")
  otp_id!: string;

  @Column({type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", length: 6 })
  otp!: string;

  @Column({
    type: "enum",
    enum: OtpType
  })
  type!: OtpType;

  @Column({type: "boolean", default: false})
  is_verified!: boolean;

  @Column({ type: "timestamp" })
  expires_at!: Date;

  @CreateDateColumn()
  created_at!: Date;
}