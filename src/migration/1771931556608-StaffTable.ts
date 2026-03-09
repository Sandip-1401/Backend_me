import { MigrationInterface, QueryRunner } from 'typeorm';

export class StaffTable1771931556608 implements MigrationInterface {
  name = 'StaffTable1771931556608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."staff_staff_type_enum" AS ENUM('NURSE', 'RECEPTIONIST', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("staff_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "staff_type" "public"."staff_staff_type_enum" NOT NULL, "contact_number" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ce6869e5d8a52ed3edd5cb750f6" PRIMARY KEY ("staff_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TYPE "public"."staff_staff_type_enum"`);
  }
}
