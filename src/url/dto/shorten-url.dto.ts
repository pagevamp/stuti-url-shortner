import { IsDateString, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly original_url: string;

  @IsNotEmpty()
  @IsDateString()
  readonly expires_at: Date;
}
