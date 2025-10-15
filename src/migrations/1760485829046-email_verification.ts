import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailVerification1760485829046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "email_verifications" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" uuid NOT NULL,
        "token" VARCHAR NOT NULL UNIQUE,
        "expires_at" timestamptz NOT NULL,
        "is_used" BOOLEAN NOT NULL DEFAULT false,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "FK_user_email_verification" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
        );
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "email_verifications" CASCADE`);
  }
}
