import { MigrationInterface, QueryRunner } from 'typeorm';

export class UrlAnalytics1761808658016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "url_analytics" (
           "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),       
           "url_id" uuid NOT NULL,
           "ip_address" VARCHAR,
           "country" VARCHAR(255),
           "user_agent" VARCHAR(255),
           "browser" VARCHAR(255),
           "os" VARCHAR(255),
           "device" VARCHAR(255),
           "clicked_at" timestamptz DEFAULT now(),
           CONSTRAINT "FK_url_analytics_url_id_key" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE
           );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "url_analytics"');
  }
}
