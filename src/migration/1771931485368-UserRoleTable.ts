import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleTable1771931485368 implements MigrationInterface {
    name = 'UserRoleTable1771931485368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_role" ("user_role_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "assigned_at" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_77580f3bab637e39a7fdd01a94c" PRIMARY KEY ("user_role_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_role"`);
    }

}
