import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefernceIdInNotificationTable1773318684160 implements MigrationInterface {
    name = 'AddRefernceIdInNotificationTable1773318684160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "reference_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "reference_id"`);
    }

}
