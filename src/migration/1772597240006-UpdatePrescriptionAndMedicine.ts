import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePrescriptionAndMedicine1772597240006 implements MigrationInterface {
  name = 'UpdatePrescriptionAndMedicine1772597240006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "medicine_name"`);
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD "medicine_name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "dosage"`);
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD "dosage" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "frequency"`);
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD "frequency" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_47b5fc767e5201576cd9601d40d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ALTER COLUMN "prescribed_date" SET DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "UQ_47b5fc767e5201576cd9601d40d" UNIQUE ("medical_record_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_47b5fc767e5201576cd9601d40d" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("medical_record_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_47b5fc767e5201576cd9601d40d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "UQ_47b5fc767e5201576cd9601d40d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ALTER COLUMN "prescribed_date" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_47b5fc767e5201576cd9601d40d" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("medical_record_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "frequency"`);
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD "frequency" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "dosage"`);
    await queryRunner.query(`ALTER TABLE "prescription_medicine" ADD "dosage" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "medicine_name"`);
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD "medicine_name" TIMESTAMP NOT NULL`,
    );
  }
}
