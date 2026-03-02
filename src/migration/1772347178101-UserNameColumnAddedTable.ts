import { MigrationInterface, QueryRunner } from "typeorm";

export class UserNameColumnAddedTable1772347178101 implements MigrationInterface {
    name = 'UserNameColumnAddedTable1772347178101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
