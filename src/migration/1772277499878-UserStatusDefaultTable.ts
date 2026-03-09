import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserStatusDefaultTable1772277499878 implements MigrationInterface {
  name = 'UserStatusDefaultTable1772277499878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
  }
}
