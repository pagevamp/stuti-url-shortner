import { IsString, IsNumber, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class EnvConfig {
  @IsString()
  DB_HOST: string;

  @Type(() => Number)
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @Type(() => Number)
  @IsNumber()
  PORT: number;

  @IsString()
  REDIS_HOST: string;

  @Type(() => Number)
  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  URL_EXPIRATION_TIME: string;

  @Type(() => Number)
  @IsNumber()
  EMAIL_PORT: number;

  @IsString()
  EMAIL_HOST: string;

  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASSWORD: string;

  @IsString()
  EMAIL_CONFIRMATION_URL: string;
}
