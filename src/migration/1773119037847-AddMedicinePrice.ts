import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMedicinePrice1773119037847 implements MigrationInterface {
  name = 'AddMedicinePrice1773119037847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prescription_medicine" ADD "unit_price" numeric(10,2)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "unit_price"`);
  }
}
