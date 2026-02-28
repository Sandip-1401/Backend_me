import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentTable1771932017411 implements MigrationInterface {
    name = 'DepartmentTable1771932017411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("department_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "department_name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_980e3e1f25ca867c47e38021bfc" UNIQUE ("department_name"), CONSTRAINT "PK_28a598987c3302c0b4dfc71f868" PRIMARY KEY ("department_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
