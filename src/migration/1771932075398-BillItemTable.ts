import { MigrationInterface, QueryRunner } from "typeorm";

export class BillItemTable1771932075398 implements MigrationInterface {
    name = 'BillItemTable1771932075398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bill_item" ("bill_item_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item_type" character varying NOT NULL, "quantity" integer, "unit_price" numeric, "amount" numeric, CONSTRAINT "PK_b5896c85a1eb893c751a98c1d16" PRIMARY KEY ("bill_item_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bill_item"`);
    }

}
