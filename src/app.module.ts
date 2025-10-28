import { EnvConfig } from './config/env.validation';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import z from 'zod';
import { AppDataSourceOptions } from 'config/data-source';
import { UserModule } from 'user/user.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { AuthModule } from 'auth/auth.module';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

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
    TypeOrmModule.forRoot(AppDataSourceOptions),
    UserModule,
    EmailVerificationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
