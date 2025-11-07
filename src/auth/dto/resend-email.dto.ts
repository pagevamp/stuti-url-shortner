import { IsEmail, IsString } from 'class-validator';

export class ResendEmailDto {
  @IsEmail()
  @IsString()
  readonly email: string;
}
