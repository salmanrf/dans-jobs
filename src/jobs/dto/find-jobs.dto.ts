import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindJobsDto {
  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBooleanString()
  @IsOptional()
  full_time?: boolean;

  @IsNumberString()
  @IsNotEmpty()
  page: number;
}
