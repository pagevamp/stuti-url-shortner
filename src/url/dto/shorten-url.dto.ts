import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsString()
  readonly original_url: string;

  @IsNotEmpty()
  @IsDateString()
  readonly expires_at: Date;
}
