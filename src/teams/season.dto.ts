import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class SeasonDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  @ApiProperty({ example: '24/25', description: 'Season year representation' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ example: 50, description: 'Number of wins in the season' })
  wins: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ example: 32, description: 'Number of losses in the season' })
  loses: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'Indicates if team made playoffs',
    default: true,
  })
  playoffs: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
    description: 'Indicates if team was champion in the season',
    default: false,
  })
  champion: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'LAL', description: 'Identifier of the team' })
  teamName: string;
}
