import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import z from 'zod';
import { AppDataSourceOptions } from 'config/data-source';
import { UserModule } from 'user/user.module';

const validationSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_SYNCHRONIZE: z.string(),
  PORT: z.coerce.number(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
      validate: (env) => {
        const parsed = validationSchema.safeParse(env);
        if (!parsed.success) {
          console.error('Invalid environment variables', parsed.error.flatten().fieldErrors);
          throw new Error('Invalid environment variables');
        }
        return parsed.data;
      },
    }),
    TypeOrmModule.forRoot(AppDataSourceOptions),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
