import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMedicalRecordAppointmentRelation1772591379756 implements MigrationInterface {
  name = 'UpdateMedicalRecordAppointmentRelation1772591379756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "UQ_4185307f688fcdf88d700b23631" UNIQUE ("appointment_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "UQ_4185307f688fcdf88d700b23631"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
