import { MigrationInterface, QueryRunner } from "typeorm";

export class SpecificationTable1771931598183 implements MigrationInterface {
    name = 'SpecificationTable1771931598183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "specification" ("specification_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "specification_name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_1892635886b5b158bc48f906d7a" UNIQUE ("specification_name"), CONSTRAINT "PK_c8e123deac21607f7452444d06e" PRIMARY KEY ("specification_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "specification"`);
    }

}
