import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentStatusTable1771932206372 implements MigrationInterface {
  name = 'AppointmentStatusTable1771932206372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_status_status_name_enum" AS ENUM('BOOKED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointment_status" ("status_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status_name" "public"."appointment_status_status_name_enum" NOT NULL, CONSTRAINT "UQ_cc44f85f75fe64b3700aba58461" UNIQUE ("status_name"), CONSTRAINT "PK_87cd07a81bf09469eb29802302e" PRIMARY KEY ("status_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appointment_status"`);
    await queryRunner.query(`DROP TYPE "public"."appointment_status_status_name_enum"`);
  }
}
