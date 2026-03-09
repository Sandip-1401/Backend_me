import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  address_id!: string;

  @Column({ type: 'varchar' })
  address_line_1!: string;

  @Column({ type: 'varchar', nullable: true })
  address_line_2?: string;

  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  state!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ type: 'varchar' })
  pincode!: string;
}
