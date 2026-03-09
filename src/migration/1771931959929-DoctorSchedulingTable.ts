import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorSchedulingTable1771931959929 implements MigrationInterface {
  name = 'DoctorSchedulingTable1771931959929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."doctor_scheduling_day_of_week_enum" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor_scheduling" ("schedule_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day_of_week" "public"."doctor_scheduling_day_of_week_enum" NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "slot_duration_minutes" integer NOT NULL, "max_patients" integer, CONSTRAINT "PK_e3cb5e94d3a6ceb10e80403e07e" PRIMARY KEY ("schedule_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctor_scheduling"`);
    await queryRunner.query(`DROP TYPE "public"."doctor_scheduling_day_of_week_enum"`);
  }
}
