import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsVerifiedOtp1773393614591 implements MigrationInterface {
    name = 'AddIsVerifiedOtp1773393614591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_verifications" ADD "is_verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_verifications" DROP COLUMN "is_verified"`);
    }

}
