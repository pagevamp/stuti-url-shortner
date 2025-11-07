import { MigrationInterface, QueryRunner } from 'typeorm';

export class Indexes1762500238100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "idx_users_email" ON "users" ("email")
       CREATE INDEX "idx_users_verified_at" ON "users" ("verified_at");

       CREATE INDEX "idx_urls_expires_at" ON "urls" ("expires_at");
       CREATE INDEX "idx_urls_deleted_at" ON "urls" ("deleted_at");
       CREATE INDEX "idx_urls_short_url" ON "urls" ("short_url");
       CREATE INDEX "idx_urls_notified" ON "urls" ("notified");


       CREATE INDEX "idx_url_analytics_clicked_at" ON "url_analytics" ("clicked_at");      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "idx_users_email" ON "users" ("email")
       DROP INDEX "idx_users_verified_at" ON "users" ("verified_at");

       DROP INDEX "idx_urls_expires_at" ON "urls" ("expires_at");
       DROP INDEX "idx_urls_deleted_at" ON "urls" ("deleted_at");
       DROP INDEX "idx_urls_short_url" ON "urls" ("short_url");
       DROP INDEX "idx_urls_notified" ON "urls" ("notified");

       DROP INDEX "idx_url_analytics_clicked_at" ON "url_analytics" ("clicked_at");
      `,
    );
  }
}
