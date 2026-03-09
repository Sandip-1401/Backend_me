import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuditLogTable1771932100776 implements MigrationInterface {
  name = 'AuditLogTable1771932100776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."audit_log_action_enum" AS ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit_log" ("audit_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" "public"."audit_log_action_enum" NOT NULL, "entity_name" character varying NOT NULL, "entity_id" uuid, "action_time" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_90d705dc65e834a7bfc79ea4df0" PRIMARY KEY ("audit_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "audit_log"`);
    await queryRunner.query(`DROP TYPE "public"."audit_log_action_enum"`);
  }
}
