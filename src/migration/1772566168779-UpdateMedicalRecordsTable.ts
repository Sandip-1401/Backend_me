import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMedicalRecordsTable1772566168779 implements MigrationInterface {
    name = 'UpdateMedicalRecordsTable1772566168779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`);
        await queryRunner.query(`ALTER TABLE "medical_records" ALTER COLUMN "record_date" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "medical_records" ALTER COLUMN "appointment_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`);
        await queryRunner.query(`ALTER TABLE "medical_records" ALTER COLUMN "appointment_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medical_records" ALTER COLUMN "record_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
