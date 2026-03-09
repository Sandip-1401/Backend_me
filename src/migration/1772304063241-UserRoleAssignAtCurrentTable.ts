import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleAssignAtCurrentTable1772304063241 implements MigrationInterface {
  name = 'UserRoleAssignAtCurrentTable1772304063241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role" ALTER COLUMN "assigned_at" SET DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role" ALTER COLUMN "assigned_at" DROP DEFAULT`);
  }
}
