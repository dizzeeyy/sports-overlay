import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SeasonDto } from './season.dto';

export class TeamsCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  shortName: string;

  @IsNotEmpty()
  @IsUrl()
  logo: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeasonDto)
  seasons: SeasonDto[];

  @IsNotEmpty()
  @IsString()
  sportId: string;
}
