import { IsString } from 'class-validator';

export class ResendEmailDto {

  @IsString()
  id: string;
  
}
