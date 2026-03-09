import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1771931140233 implements MigrationInterface {
  name = 'UserTable1771931140233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'PENDING', 'SUSPENDED', 'DELETED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_auth_provider_enum" AS ENUM('LOCAL', 'GOOGLE', 'OTP')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "phone_number" character varying, "password_hash" character varying NOT NULL, "password_changed_at" TIMESTAMP, "status" "public"."users_status_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_verified" boolean NOT NULL DEFAULT false, "last_login_at" TIMESTAMP, "failed_login_attempts" integer NOT NULL DEFAULT '0', "locked_until" TIMESTAMP, "auth_provider" "public"."users_auth_provider_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_auth_provider_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
  }
}
