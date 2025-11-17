import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateUrlDto {
  @IsNotEmpty()
  @IsDateString()
  readonly expires_at: Date;
}
