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
import { ApiProperty } from '@nestjs/swagger';

export class TeamsCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Los Angeles Lakers',
    description: 'Full name of the team',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  @ApiProperty({
    example: 'LAL',
    description: 'Short name / abbreviation name of the team',
  })
  shortName: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'https://photos.com/lakers-logo.png',
    description: 'URL to the team logo image',
  })
  logo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Los Angeles',
    description: 'City where the team is based',
  })
  city: string;

  @IsArray()
  @ApiProperty({
    type: () => [SeasonDto],
    description: 'Seasons participated by the team',
  })
  @ValidateNested({ each: true })
  @Type(() => SeasonDto)
  seasons: SeasonDto[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'uuid-123',
    description: 'Sport unique identifier the team belongs to',
  })
  sportId: string;
}
