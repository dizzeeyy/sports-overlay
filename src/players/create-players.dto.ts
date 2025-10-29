import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { MatchPlayer } from 'src/matches/match-player.entity';
import { MatchStatuses } from 'src/matches/match.entity';
import { Teams } from 'src/teams/teams.entity';

export class createPlayersDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'Giannis' })
  firstName: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'Antetokoumpo' })
  lastName: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: 'YYYY-MM-DD' })
  birthDate?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsNotEmpty()
  @ApiProperty({ example: Teams })
  team: Teams;

  @IsOptional()
  @ApiProperty({ example: MatchPlayer })
  matchStats: MatchPlayer[];
}
