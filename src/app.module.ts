import { EnvConfig } from './config/env.validation';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from 'config/data-source';
import { UserModule } from 'user/user.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { AuthModule } from 'auth/auth.module';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { UrlModule } from 'url/url.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { LogModule } from 'log/log.module';
import { UrlAnalyticsModule } from 'url-analytics/url-analytics.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
      validate: (env) => {
        const envConfig = plainToInstance(EnvConfig, env, { enableImplicitConversion: true });
        const errors = validateSync(envConfig, { skipMissingProperties: false });

        if (errors.length > 0) {
          console.error(
            'Invalid environment variables:',
            errors.map((err) =>
              err.constraints
                ? Object.values(err.constraints).join(', ')
                : 'Unknown validation error',
            ),
          );
          throw new Error('Invalid environment variables');
        }

        return envConfig;
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: 5,
        },
      ],
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: { attempts: 3 },
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSourceOptions),
    UserModule,
    EmailVerificationModule,
    AuthModule,
    LogModule,
    UrlModule,
    UrlAnalyticsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
