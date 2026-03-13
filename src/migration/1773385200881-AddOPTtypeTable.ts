import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOPTtypeTable1773385200881 implements MigrationInterface {
    name = 'AddOPTtypeTable1773385200881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."otp_verifications_type_enum" AS ENUM('REGISTER', 'PASSWORD_RESET')`);
        await queryRunner.query(`ALTER TABLE "otp_verifications" ADD "type" "public"."otp_verifications_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_verifications" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."otp_verifications_type_enum"`);
    }

}
