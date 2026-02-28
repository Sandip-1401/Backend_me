import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentTable1771931790196 implements MigrationInterface {
    name = 'PaymentTable1771931790196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "payment" ("payment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_date" TIMESTAMP NOT NULL, "payment_method" TIMESTAMP NOT NULL, "amount" numeric NOT NULL, "status" "public"."payment_status_enum" NOT NULL, CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY ("payment_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    }

}
