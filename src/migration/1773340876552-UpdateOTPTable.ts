import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOTPTable1773340876552 implements MigrationInterface {
    name = 'UpdateOTPTable1773340876552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_verifications" RENAME COLUMN "id" TO "otp_id"`);
        await queryRunner.query(`ALTER TABLE "otp_verifications" RENAME CONSTRAINT "PK_91d17e75ac3182dba6701869b39" TO "PK_2ba0d19b7a6bf47ccc951a3ab91"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_verifications" RENAME CONSTRAINT "PK_2ba0d19b7a6bf47ccc951a3ab91" TO "PK_91d17e75ac3182dba6701869b39"`);
        await queryRunner.query(`ALTER TABLE "otp_verifications" RENAME COLUMN "otp_id" TO "id"`);
    }

}
