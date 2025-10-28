import { IsString } from 'class-validator';

export class ResendEmailDto {

  @IsString()
  email: string;
  
}
