import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailVerifications1760551172519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "email_verifications" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),        
        "user_id" uuid NOT NULL,
        "token" VARCHAR(255) NOT NULL UNIQUE,
        "expires_at" timestamptz NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "FK_email_verifications_user_id_key" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
        );
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "email_verifications" CASCADE`);
  }
}
