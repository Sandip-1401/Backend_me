import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOndeleteCasecad21774960897420 implements MigrationInterface {
    name = 'UpdateOndeleteCasecad21774960897420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_f483f0de5daf9ee8cf5c95bf932"`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_f483f0de5daf9ee8cf5c95bf932" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_f483f0de5daf9ee8cf5c95bf932"`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_f483f0de5daf9ee8cf5c95bf932" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
