import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class AnalyticsFilterDto {
  @Transform(({ value }) => new Date(value).toUTCString(), { toPlainOnly: true })
  @IsOptional()
  @IsDateString()
  start_date: Date;

  @Transform(({ value }) => new Date(value).toUTCString(), { toPlainOnly: true })
  @IsOptional()
  @IsDateString()
  end_date: Date;

  @IsString()
  @IsOptional()
  browser: string;

  @IsString()
  @IsOptional()
  os: string;

  @IsString()
  @IsOptional()
  device: string;

  @IsString()
  @IsOptional()
  country: string;
}
