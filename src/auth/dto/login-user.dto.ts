import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
