import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type{ Bill } from "./bill.entities.js";

@Entity("bill_item")
export class BillItem {
  @PrimaryGeneratedColumn("uuid")
  bill_item_id!: string;

  @ManyToOne("Bill", "items", { nullable: false })
  @JoinColumn({ name: "bill_id" })
  bill!: Bill;

  @Column({type: "varchar"})
  item_type!: string;

  @Column({ type: "int", nullable: true })
  quantity?: number;

  @Column({ type: "decimal", nullable: true })
  unit_price?: number;

  @Column({ type: "decimal", nullable: true })
  amount?: number;
}
