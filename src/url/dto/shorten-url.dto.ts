import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsString()
  original_url: string;

  @IsNotEmpty()
  @IsDateString()
  expires_at: Date;
}
