import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAppointmentStatusTable1772976568319 implements MigrationInterface {
    name = 'UpdateAppointmentStatusTable1772976568319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."appointment_status_status_name_enum" RENAME TO "appointment_status_status_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_status_name_enum" AS ENUM('BOOKED', 'APPROVED', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "appointment_status" ALTER COLUMN "status_name" TYPE "public"."appointment_status_status_name_enum" USING "status_name"::"text"::"public"."appointment_status_status_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_status_name_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_status_name_enum_old" AS ENUM('BOOKED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')`);
        await queryRunner.query(`ALTER TABLE "appointment_status" ALTER COLUMN "status_name" TYPE "public"."appointment_status_status_name_enum_old" USING "status_name"::"text"::"public"."appointment_status_status_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_status_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."appointment_status_status_name_enum_old" RENAME TO "appointment_status_status_name_enum"`);
    }

}
