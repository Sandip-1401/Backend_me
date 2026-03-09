import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressTable1771932237301 implements MigrationInterface {
  name = 'AddressTable1771932237301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address_line_1" character varying NOT NULL, "address_line_2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "pincode" character varying NOT NULL, CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
