import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteIndexFromUserRoleTable1772434966614 implements MigrationInterface {
  name = 'DeleteIndexFromUserRoleTable1772434966614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_f634684acb47c1a158b83af515"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f634684acb47c1a158b83af515" ON "user_role" ("role_id", "user_id") `,
    );
  }
}
