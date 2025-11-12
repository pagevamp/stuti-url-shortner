import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
}
