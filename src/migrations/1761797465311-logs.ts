import { MigrationInterface, QueryRunner } from 'typeorm';

export class Logs1761797465311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "logs"(
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),        
        "context" VARCHAR(255),
        "message" VARCHAR(255),
        "metadata" JSON,
        "created_at" timestamptz NOT NULL DEFAULT now()       
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "logs" CASCADE`);
  }
}
