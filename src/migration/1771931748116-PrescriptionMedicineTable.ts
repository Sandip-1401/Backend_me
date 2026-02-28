import { MigrationInterface, QueryRunner } from "typeorm";

export class PrescriptionMedicineTable1771931748116 implements MigrationInterface {
    name = 'PrescriptionMedicineTable1771931748116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescription_medicine" ("prescription_medicine_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "medicine_name" TIMESTAMP NOT NULL, "dosage" TIMESTAMP NOT NULL, "frequency" TIMESTAMP NOT NULL, "duration_days" integer NOT NULL, CONSTRAINT "PK_554304dfc0936e1abe83d470c1c" PRIMARY KEY ("prescription_medicine_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prescription_medicine"`);
    }

}
