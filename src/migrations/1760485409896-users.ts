import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1760485409896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "username" VARCHAR(255) UNIQUE NOT NULL,
        "email" VARCHAR(50) UNIQUE NOT NULL,
        "password" VARCHAR NOT NULL,
        "verified_at" timestamptz,
        "updated_at" timestamptz NOT NULL,
        "created_at" timestamptz DEFAULT now() NOT NULL
      );
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
  }
}
