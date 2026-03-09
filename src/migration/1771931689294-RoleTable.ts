import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleTable1771931689294 implements MigrationInterface {
  name = 'RoleTable1771931689294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("role_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE ("role_name"), CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
