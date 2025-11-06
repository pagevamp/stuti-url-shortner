import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsISO31661Alpha2, IsOptional, IsString } from 'class-validator';

export class AnalyticsFilterDto {
  @Transform(({ value }) => new Date(value).toUTCString(), { toPlainOnly: true }) //to make the query date compatible with the date in database
  @IsOptional()
  @IsDateString()
  start_date: Date;

  @Transform(({ value }) => new Date(value).toUTCString(), { toPlainOnly: true }) //to make the query date compatible with the date in database
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
  @IsISO31661Alpha2() // to validate country codes with two character in UpperCase
  country: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  groupByUrl: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  groupByBrowser: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  groupByOs: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  groupByDevice: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  groupByCountry: boolean;
}
