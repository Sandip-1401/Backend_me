import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDoctorInitStatusTable1772940404200 implements MigrationInterface {
  name = 'UpdateDoctorInitStatusTable1772940404200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."doctors_status_enum" RENAME TO "doctors_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."doctors_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING')`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ALTER COLUMN "status" TYPE "public"."doctors_status_enum" USING "status"::"text"::"public"."doctors_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
    await queryRunner.query(`DROP TYPE "public"."doctors_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."doctors_status_enum_old" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED')`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ALTER COLUMN "status" TYPE "public"."doctors_status_enum_old" USING "status"::"text"::"public"."doctors_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
    await queryRunner.query(`DROP TYPE "public"."doctors_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."doctors_status_enum_old" RENAME TO "doctors_status_enum"`,
    );
  }
}
