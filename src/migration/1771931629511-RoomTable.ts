import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoomTable1771931629511 implements MigrationInterface {
  name = 'RoomTable1771931629511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" ("room_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "room_number" TIMESTAMP NOT NULL, "room_type" TIMESTAMP NOT NULL, "daily_charge" numeric, "is_available" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_224248134ed3ac1fb6d2f872907" UNIQUE ("room_number"), CONSTRAINT "PK_483751c0abab68ed1ac952ae920" PRIMARY KEY ("room_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
