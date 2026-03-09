import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteIndexFromAppointmentTable1772627745791 implements MigrationInterface {
  name = 'DeleteIndexFromAppointmentTable1772627745791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_e4769993fea01c3ba9e536a286"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e4769993fea01c3ba9e536a286" ON "appointment" ("appointment_date", "appointment_time", "doctor_id") `,
    );
  }
}
