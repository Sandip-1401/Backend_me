import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorTable1771931931186 implements MigrationInterface {
  name = 'DoctorTable1771931931186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."doctor_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor" ("doctor_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "registration_number" character varying NOT NULL, "qualification" character varying NOT NULL, "experience_years" integer NOT NULL, "consultation_fee" numeric, "is_available" boolean NOT NULL DEFAULT true, "status" "public"."doctor_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_3b74e691ed88c37d47e3ff1615b" UNIQUE ("registration_number"), CONSTRAINT "PK_e2959c517497025482609c0166c" PRIMARY KEY ("doctor_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctor"`);
    await queryRunner.query(`DROP TYPE "public"."doctor_status_enum"`);
  }
}
