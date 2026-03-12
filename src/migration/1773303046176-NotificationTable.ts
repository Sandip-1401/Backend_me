import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationTable1773303046176 implements MigrationInterface {
    name = 'NotificationTable1773303046176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('APPOINTMENT', 'PAYMENT', 'SYSTEM')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("notification_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sender_id" uuid NOT NULL, "receiver_id" uuid NOT NULL, "title" character varying(150) NOT NULL, "message" text NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eaedfe19f0f765d26afafa85956" PRIMARY KEY ("notification_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    }

}
