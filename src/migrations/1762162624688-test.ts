import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1762162624688 implements MigrationInterface {
  name = 'Test1762162624688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_urlss_user_id_key"`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" DROP CONSTRAINT "FK_email_verifications_user_id_key"`,
    );
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "country" character varying`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "user_agent"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "user_agent" character varying`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "browser"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "browser" character varying`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "os"`);
   await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "device"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "device" character varying`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ALTER COLUMN "url_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "original_url"`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD "original_url" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "urls_short_url_key"`);
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "short_url"`);
    await queryRunner.query(`ALTER TABLE "urls" ADD "short_url" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "UQ_94d3cb6d1ef354835a1d3810d7f" UNIQUE ("short_url")`,
    );
    await queryRunner.query(`ALTER TABLE "urls" ALTER COLUMN "notified" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" DROP CONSTRAINT "email_verifications_pkey"`,
    );
    await queryRunner.query(`ALTER TABLE "email_verifications" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "email_verifications" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD CONSTRAINT "PK_c1ea2921e767f83cd44c0af203f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verifications" DROP CONSTRAINT "email_verifications_token_key"`,
    );
    await queryRunner.query(`ALTER TABLE "email_verifications" DROP COLUMN "token"`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD "token" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD CONSTRAINT "UQ_595be4c36e66b21d3fd14c73a24" UNIQUE ("token")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_username_key"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_email_key"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "context"`);
    await queryRunner.query(`ALTER TABLE "logs" ADD "context" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "message"`);
    await queryRunner.query(`ALTER TABLE "logs" ADD "message" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "url_analytics" ADD CONSTRAINT "FK_43156539ac580b9322e48464f92" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "FK_5b194a4470977b71ff490dfc64b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD CONSTRAINT "FK_c4f1838323ae1dff5aa00148915" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_verifications" DROP CONSTRAINT "FK_c4f1838323ae1dff5aa00148915"`,
    );
    await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_5b194a4470977b71ff490dfc64b"`);
    await queryRunner.query(
      `ALTER TABLE "url_analytics" DROP CONSTRAINT "FK_43156539ac580b9322e48464f92"`,
    );
    await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "message"`);
    await queryRunner.query(`ALTER TABLE "logs" ADD "message" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "context"`);
    await queryRunner.query(`ALTER TABLE "logs" ADD "context" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(50) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "users_email_key" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "users_username_key" UNIQUE ("username")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" DROP CONSTRAINT "UQ_595be4c36e66b21d3fd14c73a24"`,
    );
    await queryRunner.query(`ALTER TABLE "email_verifications" DROP COLUMN "token"`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD "token" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_token_key" UNIQUE ("token")`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verifications" DROP CONSTRAINT "PK_c1ea2921e767f83cd44c0af203f"`,
    );
    await queryRunner.query(`ALTER TABLE "email_verifications" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "urls" ALTER COLUMN "notified" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "UQ_94d3cb6d1ef354835a1d3810d7f"`);
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "short_url"`);
    await queryRunner.query(`ALTER TABLE "urls" ADD "short_url" character varying(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "urls_short_url_key" UNIQUE ("short_url")`,
    );
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "original_url"`);
    await queryRunner.query(`ALTER TABLE "urls" ADD "original_url" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ALTER COLUMN "url_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "device"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "device" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "os"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "os" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "browser"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "browser" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "user_agent"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "user_agent" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "url_analytics" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "url_analytics" ADD "country" character varying(255)`);
    await queryRunner.query(
      `ALTER TABLE "email_verifications" ADD CONSTRAINT "FK_email_verifications_user_id_key" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "FK_urlss_user_id_key" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
