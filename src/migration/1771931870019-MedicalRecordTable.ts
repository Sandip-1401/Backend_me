import { MigrationInterface, QueryRunner } from "typeorm";

export class MedicalRecordTable1771931870019 implements MigrationInterface {
    name = 'MedicalRecordTable1771931870019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medical_records" ("medical_record_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "diagnosis" text NOT NULL, "notes" text, "record_date" date NOT NULL, CONSTRAINT "PK_5b8c42f919ef191c0fac9118381" PRIMARY KEY ("medical_record_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "medical_records"`);
    }

}
