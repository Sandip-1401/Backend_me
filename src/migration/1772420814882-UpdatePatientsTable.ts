import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePatientsTable1772420814882 implements MigrationInterface {
  name = 'UpdatePatientsTable1772420814882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_b5b0de11e942201024ee9f32be7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emergency_info" DROP CONSTRAINT "FK_0e48f5fac36fbc0a92315b0a856"`,
    );
    await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_d9962ee37addc6155076867529b"`);
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_7cb0b064e77d2af5ca7a7f691d2"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."patients_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."patients_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DECEASED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "patients" ("patient_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "blood_group" character varying, "date_of_birth" date, "gender" "public"."patients_gender_enum",    "height" numeric(5,2), "weight" numeric(5,2), "status" "public"."patients_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "address_id" uuid, CONSTRAINT "REL_7fe1518dc780fd777669b5cb7a" UNIQUE ("user_id"), CONSTRAINT "PK_1dc2db3a63a0bf2388fbfee86b1" PRIMARY KEY ("patient_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_b5b0de11e942201024ee9f32be7" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_7fe1518dc780fd777669b5cb7a0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_f483f0de5daf9ee8cf5c95bf932" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emergency_info" ADD CONSTRAINT "FK_0e48f5fac36fbc0a92315b0a856" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ADD CONSTRAINT "FK_d9962ee37addc6155076867529b" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_7cb0b064e77d2af5ca7a7f691d2" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_7cb0b064e77d2af5ca7a7f691d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_d9962ee37addc6155076867529b"`);
    await queryRunner.query(
      `ALTER TABLE "emergency_info" DROP CONSTRAINT "FK_0e48f5fac36fbc0a92315b0a856"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_f483f0de5daf9ee8cf5c95bf932"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_7fe1518dc780fd777669b5cb7a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_b5b0de11e942201024ee9f32be7"`,
    );
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(`DROP TYPE "public"."patients_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."patients_gender_enum"`);
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_7cb0b064e77d2af5ca7a7f691d2" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ADD CONSTRAINT "FK_d9962ee37addc6155076867529b" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emergency_info" ADD CONSTRAINT "FK_0e48f5fac36fbc0a92315b0a856" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_b5b0de11e942201024ee9f32be7" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
