import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDoctorTable1772338237238 implements MigrationInterface {
  name = 'UpdateDoctorTable1772338237238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_e2f19093b7d00398cc14db8b076"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_scheduling" DROP CONSTRAINT "FK_67a75e1c4b89ed03fb8b0f24a03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_4c069c10d05c2d644ef01ecb5d6"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."doctors_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors" ("doctor_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "registration_number" character varying NOT NULL, "qualification" character varying NOT NULL, "experience_years" integer NOT NULL, "consultation_fee" numeric(10,2), "is_available" boolean NOT NULL DEFAULT true, "status" "public"."doctors_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "department_id" uuid NOT NULL, "address_id" uuid, CONSTRAINT "UQ_3706fcca19084e35c1f9e5354bc" UNIQUE ("registration_number"), CONSTRAINT "REL_653c27d1b10652eb0c7bbbc442" UNIQUE ("user_id"), CONSTRAINT "PK_24821d9468276ddc40107fc0819" PRIMARY KEY ("doctor_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_e2f19093b7d00398cc14db8b076" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_scheduling" ADD CONSTRAINT "FK_67a75e1c4b89ed03fb8b0f24a03" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_653c27d1b10652eb0c7bbbc4427" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_3672b55bcb332e54bc8d8cda1c1" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_03553285b85e8522546e9d5bb98" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_4c069c10d05c2d644ef01ecb5d6" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_4c069c10d05c2d644ef01ecb5d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_03553285b85e8522546e9d5bb98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_3672b55bcb332e54bc8d8cda1c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_653c27d1b10652eb0c7bbbc4427"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_scheduling" DROP CONSTRAINT "FK_67a75e1c4b89ed03fb8b0f24a03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_e2f19093b7d00398cc14db8b076"`,
    );
    await queryRunner.query(`DROP TABLE "doctors"`);
    await queryRunner.query(`DROP TYPE "public"."doctors_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_4c069c10d05c2d644ef01ecb5d6" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_scheduling" ADD CONSTRAINT "FK_67a75e1c4b89ed03fb8b0f24a03" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_e2f19093b7d00398cc14db8b076" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
