import { MigrationInterface, QueryRunner } from "typeorm";

export class AppointmentTable1771932168181 implements MigrationInterface {
    name = 'AppointmentTable1771932168181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("appointment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointment_date" date NOT NULL, "appointment_time" TIME NOT NULL, "reason" character varying, CONSTRAINT "PK_ee9f73735a635356d4da9bd3e69" PRIMARY KEY ("appointment_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
