import { MigrationInterface, QueryRunner } from 'typeorm';

export class Urls1761698820236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "urls" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),        
        "user_id" uuid NOT NULL,
        "original_url" VARCHAR NOT NULL,
        "short_url" VARCHAR(255) UNIQUE NOT NULL,
        "expires_at" timestamptz NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        CONSTRAINT "FK_urlss_user_id_key" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
        
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "urls" CASCADE`);
  }
}
