import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueRoleAssign1772560128641 implements MigrationInterface {
  name = 'UniqueRoleAssign1772560128641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f634684acb47c1a158b83af515" ON "user_role" ("user_id", "role_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_f634684acb47c1a158b83af515"`);
  }
}
