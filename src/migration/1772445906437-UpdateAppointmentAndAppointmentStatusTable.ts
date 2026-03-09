import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAppointmentAndAppointmentStatusTable1772445906437 implements MigrationInterface {
  name = 'UpdateAppointmentAndAppointmentStatusTable1772445906437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_status" RENAME COLUMN "status_id" TO "appointment_status_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_status" RENAME CONSTRAINT "PK_87cd07a81bf09469eb29802302e" TO "PK_5e67805aa6e7e32811117305257"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "appointment" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e4769993fea01c3ba9e536a286" ON "appointment" ("doctor_id", "appointment_date", "appointment_time") `,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_e4769993fea01c3ba9e536a286"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "appointment_status" RENAME CONSTRAINT "PK_5e67805aa6e7e32811117305257" TO "PK_87cd07a81bf09469eb29802302e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_status" RENAME COLUMN "appointment_status_id" TO "status_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
