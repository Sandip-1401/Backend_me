import { MigrationInterface, QueryRunner } from "typeorm";

export class EmergencyInfoTable1771931897964 implements MigrationInterface {
    name = 'EmergencyInfoTable1771931897964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emergency_info" ("emergency_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contact_name" character varying NOT NULL, "relation" character varying NOT NULL, "contact_phone" character varying NOT NULL, CONSTRAINT "PK_9e4c8022e4e5373ee2bb62d633c" PRIMARY KEY ("emergency_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "emergency_info"`);
    }

}
