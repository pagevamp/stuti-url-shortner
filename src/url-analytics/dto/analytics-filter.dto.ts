import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsISO31661Alpha2,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsIn(['browser', 'os', 'device', 'country', 'url'], { each: true })
  readonly groupBy?: string[] | null;
}
