import { MigrationInterface, QueryRunner } from 'typeorm';

export class BillTable1771932047990 implements MigrationInterface {
  name = 'BillTable1771932047990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."bill_status_enum" AS ENUM('PENDING', 'PAID')`);
    await queryRunner.query(
      `CREATE TABLE "bill" ("bill_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bill_number" character varying NOT NULL, "bill_date" date NOT NULL, "total_amount" numeric NOT NULL, "discount_amount" numeric, "net_amount" numeric NOT NULL, "status" "public"."bill_status_enum" NOT NULL, CONSTRAINT "UQ_e897f48daabe3b9132f93432327" UNIQUE ("bill_number"), CONSTRAINT "PK_2e8809ac9b1aa4169175029a42a" PRIMARY KEY ("bill_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bill"`);
    await queryRunner.query(`DROP TYPE "public"."bill_status_enum"`);
  }
}
