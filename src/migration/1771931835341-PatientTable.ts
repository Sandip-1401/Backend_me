import { MigrationInterface, QueryRunner } from "typeorm";

export class PatientTable1771931835341 implements MigrationInterface {
    name = 'PatientTable1771931835341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."patient_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "public"."patient_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DECEASED')`);
        await queryRunner.query(`CREATE TABLE "patient" ("patient_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "blood_group" character varying, "date_of_birth" date, "gender" "public"."patient_gender_enum", "height" numeric, "weight" numeric, "status" "public"."patient_status_enum" NOT NULL, CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05" PRIMARY KEY ("patient_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TYPE "public"."patient_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."patient_gender_enum"`);
    }

}
