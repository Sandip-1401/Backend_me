import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBillingAndPaymentDetails1773117728061 implements MigrationInterface {
  name = 'UpdateBillingAndPaymentDetails1773117728061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" ADD "transaction_id" character varying`);
    await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_date" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_method"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "payment_method" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "amount" TYPE numeric(10,2)`);
    await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "bill_date" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "bill_date" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "amount" TYPE numeric`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_method"`);
    await queryRunner.query(`ALTER TABLE "payment" ADD "payment_method" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_date" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "transaction_id"`);
  }
}
