import { MigrationInterface, QueryRunner } from 'typeorm';

export class ForeginKeyTable1771932684859 implements MigrationInterface {
  name = 'ForeginKeyTable1771932684859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_role" ADD "role_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_role" ADD "assigned_by" uuid`);
    await queryRunner.query(`ALTER TABLE "users" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "staff" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "staff" ADD "department_id" uuid`);
    await queryRunner.query(`ALTER TABLE "specification" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "specification" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "roles" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "roles" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "prescription" ADD "medical_record_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prescription" ADD "doctor_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prescription" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD "prescription_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "payment" ADD "bill_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "payment" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "patient" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "patient" ADD "address_id" uuid`);
    await queryRunner.query(`ALTER TABLE "medical_records" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "medical_records" ADD "doctor_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "medical_records" ADD "appointment_id" uuid`);
    await queryRunner.query(`ALTER TABLE "doctor_scheduling" ADD "doctor_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "emergency_info" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "doctor" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "doctor" ADD "department_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "doctor" ADD "address_id" uuid`);
    await queryRunner.query(`ALTER TABLE "department" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "department" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "bill_item" ADD "bill_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "bill" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "bill" ADD "appointment_id" uuid`);
    await queryRunner.query(`ALTER TABLE "audit_log" ADD "actor_user_id" uuid`);
    await queryRunner.query(`ALTER TABLE "appointment" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "appointment" ADD "doctor_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "appointment" ADD "status_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admission" ADD "patient_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admission" ADD "doctor_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admission" ADD "room_id" uuid`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f634684acb47c1a158b83af515" ON "user_role" ("user_id", "role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_847702558b3d22756abc53fb4ee" FOREIGN KEY ("assigned_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_51b371508b14db31bee80fded0a" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specification" ADD CONSTRAINT "FK_75ab24f8ff12eb8b6915cd9c7fc" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "specification" ADD CONSTRAINT "FK_fa86a69d02ee1729d98fba348aa" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_4a39f3095781cdd9d6061afaae5" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_747b580d73db0ad78963d78b076" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_47b5fc767e5201576cd9601d40d" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("medical_record_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_e2f19093b7d00398cc14db8b076" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" ADD CONSTRAINT "FK_b5b0de11e942201024ee9f32be7" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" ADD CONSTRAINT "FK_3d5495fd9b8ecbee8074dc50b95" FOREIGN KEY ("prescription_id") REFERENCES "prescription"("prescription_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_bd6e1adc29607b591acd798995c" FOREIGN KEY ("bill_id") REFERENCES "bill"("bill_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_f7f56b3710d99961ab06012bbbc" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_43e2800e756c913a6c7a07cc271" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_57a1aae159d10a5626456ee73d5" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" ADD CONSTRAINT "FK_4185307f688fcdf88d700b23631" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_scheduling" ADD CONSTRAINT "FK_67a75e1c4b89ed03fb8b0f24a03" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emergency_info" ADD CONSTRAINT "FK_0e48f5fac36fbc0a92315b0a856" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_a685e79dc974f768c39e5d12281" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_0b99fe7c38690736f3df3ce2252" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_677d457bdee9c0b24953b141d09" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" ADD CONSTRAINT "FK_e08733469befa8287ca4666e24c" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" ADD CONSTRAINT "FK_e0463559d2cb70c30a9e56932af" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bill_item" ADD CONSTRAINT "FK_fe0fba0a43c5182491a8e6cb103" FOREIGN KEY ("bill_id") REFERENCES "bill"("bill_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ADD CONSTRAINT "FK_d9962ee37addc6155076867529b" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ADD CONSTRAINT "FK_2d2d21efa3727331f91fb360590" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("appointment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_log" ADD CONSTRAINT "FK_1c4c8c76598008ea972a84e7834" FOREIGN KEY ("actor_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_8f42047c7975a9606576ca274e7" FOREIGN KEY ("status_id") REFERENCES "appointment_status"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_7cb0b064e77d2af5ca7a7f691d2" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_4c069c10d05c2d644ef01ecb5d6" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" ADD CONSTRAINT "FK_fe4bb5b61bbf1d2f6c6b81c2ed1" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_fe4bb5b61bbf1d2f6c6b81c2ed1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_4c069c10d05c2d644ef01ecb5d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admission" DROP CONSTRAINT "FK_7cb0b064e77d2af5ca7a7f691d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_8f42047c7975a9606576ca274e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_log" DROP CONSTRAINT "FK_1c4c8c76598008ea972a84e7834"`,
    );
    await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_2d2d21efa3727331f91fb360590"`);
    await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_d9962ee37addc6155076867529b"`);
    await queryRunner.query(
      `ALTER TABLE "bill_item" DROP CONSTRAINT "FK_fe0fba0a43c5182491a8e6cb103"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" DROP CONSTRAINT "FK_e0463559d2cb70c30a9e56932af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" DROP CONSTRAINT "FK_e08733469befa8287ca4666e24c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_677d457bdee9c0b24953b141d09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_0b99fe7c38690736f3df3ce2252"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_a685e79dc974f768c39e5d12281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emergency_info" DROP CONSTRAINT "FK_0e48f5fac36fbc0a92315b0a856"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_scheduling" DROP CONSTRAINT "FK_67a75e1c4b89ed03fb8b0f24a03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_4185307f688fcdf88d700b23631"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_57a1aae159d10a5626456ee73d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_records" DROP CONSTRAINT "FK_43e2800e756c913a6c7a07cc271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_f7f56b3710d99961ab06012bbbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_a4b5ef3a2debad4cf4a21764fe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_bd6e1adc29607b591acd798995c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription_medicine" DROP CONSTRAINT "FK_3d5495fd9b8ecbee8074dc50b95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_b5b0de11e942201024ee9f32be7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_e2f19093b7d00398cc14db8b076"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prescription" DROP CONSTRAINT "FK_47b5fc767e5201576cd9601d40d"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_747b580d73db0ad78963d78b076"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_4a39f3095781cdd9d6061afaae5"`);
    await queryRunner.query(
      `ALTER TABLE "specification" DROP CONSTRAINT "FK_fa86a69d02ee1729d98fba348aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "specification" DROP CONSTRAINT "FK_75ab24f8ff12eb8b6915cd9c7fc"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_51b371508b14db31bee80fded0a"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c"`);
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_847702558b3d22756abc53fb4ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_f634684acb47c1a158b83af515"`);
    await queryRunner.query(`ALTER TABLE "admission" DROP COLUMN "room_id"`);
    await queryRunner.query(`ALTER TABLE "admission" DROP COLUMN "doctor_id"`);
    await queryRunner.query(`ALTER TABLE "admission" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status_id"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "doctor_id"`);
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "audit_log" DROP COLUMN "actor_user_id"`);
    await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "appointment_id"`);
    await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "bill_item" DROP COLUMN "bill_id"`);
    await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "department_id"`);
    await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "emergency_info" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "doctor_scheduling" DROP COLUMN "doctor_id"`);
    await queryRunner.query(`ALTER TABLE "medical_records" DROP COLUMN "appointment_id"`);
    await queryRunner.query(`ALTER TABLE "medical_records" DROP COLUMN "doctor_id"`);
    await queryRunner.query(`ALTER TABLE "medical_records" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "bill_id"`);
    await queryRunner.query(`ALTER TABLE "prescription_medicine" DROP COLUMN "prescription_id"`);
    await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "patient_id"`);
    await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "doctor_id"`);
    await queryRunner.query(`ALTER TABLE "prescription" DROP COLUMN "medical_record_id"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "specification" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "specification" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "department_id"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "assigned_by"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "user_id"`);
  }
}
