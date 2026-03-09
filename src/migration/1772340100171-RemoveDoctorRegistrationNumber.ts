import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDoctorRegistrationNumber1772340100171 implements MigrationInterface {
  name = 'RemoveDoctorRegistrationNumber1772340100171';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "UQ_3706fcca19084e35c1f9e5354bc"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "registration_number"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "registration_number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "UQ_3706fcca19084e35c1f9e5354bc" UNIQUE ("registration_number")`,
    );
  }
}
