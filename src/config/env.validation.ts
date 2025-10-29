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
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  EMAIL_CONFIRMATION_URL: string;

  @IsEmail()
  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASSWORD: string;

  @IsString()
  EMAIL_SERVICE: string;
}
