import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsISO31661Alpha2, IsOptional, IsString } from 'class-validator';

export class AnalyticsFilterDto {
  @Transform(({ value }) => new Date(value).toUTCString(), { toPlainOnly: true }) //to make the query date compatible with the date in database
  @IsOptional()
  @IsDateString()
  readonly start_date?: Date;

  @Transform(({ value }) => new Date(value).toUTCString(), { toPlainOnly: true }) //to make the query date compatible with the date in database
  @IsOptional()
  @IsDateString()
  readonly end_date?: Date;

  @IsString()
  @IsOptional()
  readonly browser?: string;

  @IsString()
  @IsOptional()
  readonly os?: string;

  @IsString()
  @IsOptional()
  readonly device?: string;

  @IsString()
  @IsOptional()
  @IsISO31661Alpha2() // to validate country codes with two character in UpperCase
  readonly country?: string;

  @IsBoolean()
  @IsOptional()
  readonly groupByUrl?: boolean;

  @IsString()
  @IsOptional()
  readonly groupByBrowser?: string;

  @IsString()
  @IsOptional()
  readonly groupByOs?: string;

  @IsString()
  @IsOptional()
  readonly groupByDevice?: string;

  @IsString()
  @IsOptional()
  readonly groupByCountry?: string;
}
