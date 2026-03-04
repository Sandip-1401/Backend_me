import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateDateToMedicalRecordTable1772589730221 implements MigrationInterface {
    name = 'AddCreateDateToMedicalRecordTable1772589730221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_records" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_records" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP COLUMN "created_at"`);
    }

}
