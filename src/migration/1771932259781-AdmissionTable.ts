import { MigrationInterface, QueryRunner } from "typeorm";

export class AdmissionTable1771932259781 implements MigrationInterface {
    name = 'AdmissionTable1771932259781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admission_status_enum" AS ENUM('ADMITTED', 'DISCHARGED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "admission" ("admission_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "admission_date" TIMESTAMP NOT NULL, "discharge_date" TIMESTAMP, "status" "public"."admission_status_enum" NOT NULL, CONSTRAINT "PK_4e0c3f0882fe841fd848dc0cf92" PRIMARY KEY ("admission_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admission"`);
        await queryRunner.query(`DROP TYPE "public"."admission_status_enum"`);
    }

}
