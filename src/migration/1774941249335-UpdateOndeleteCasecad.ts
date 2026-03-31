import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOndeleteCasecad1774941249335 implements MigrationInterface {
    name = 'UpdateOndeleteCasecad1774941249335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_b5b0de11e942201024ee9f32be7"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_e2f19093b7d00398cc14db8b076"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_bd6e1adc29607b591acd798995c"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_d9962ee37addc6155076867529b"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_2d2d21efa3727331f91fb360590"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_e2f19093b7d00398cc14db8b076" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_b5b0de11e942201024ee9f32be7" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_bd6e1adc29607b591acd798995c" FOREIGN KEY ("bill_id") REFERENCES "bill"("bill_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_d9962ee37addc6155076867529b" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_2d2d21efa3727331f91fb360590" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_2d2d21efa3727331f91fb360590"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_d9962ee37addc6155076867529b"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`);
        await queryRunner.query(`ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_bd6e1adc29607b591acd798995c"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_b5b0de11e942201024ee9f32be7"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_e2f19093b7d00398cc14db8b076"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_2d2d21efa3727331f91fb360590" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_d9962ee37addc6155076867529b" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_bd6e1adc29607b591acd798995c" FOREIGN KEY ("bill_id") REFERENCES "bill"("bill_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_e2f19093b7d00398cc14db8b076" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_b5b0de11e942201024ee9f32be7" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
