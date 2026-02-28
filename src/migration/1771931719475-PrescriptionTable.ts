import { MigrationInterface, QueryRunner } from "typeorm";

export class PrescriptionTable1771931719475 implements MigrationInterface {
    name = 'PrescriptionTable1771931719475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescription" ("prescription_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "prescribed_date" date NOT NULL, "notes" text, CONSTRAINT "PK_22b70ff9494a057c70a208e80e8" PRIMARY KEY ("prescription_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prescription"`);
    }

}
