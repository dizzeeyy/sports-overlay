import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MatchPlayer } from 'src/matches/match-player.entity';
import { Teams } from 'src/teams/teams.entity';

export class UpdatePlayersDto {
  @IsOptional()
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsString()
  @IsOptional()
  @Expose()
  firstName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: 'YYYY-MM-DD' })
  @Expose()
  birthDate?: string;

  @IsString()
  @IsOptional()
  @Expose()
  position?: string;

  @IsOptional()
  @ApiProperty({ example: Teams })
  @Expose()
  team: Teams;

  @IsOptional()
  @ApiProperty({ example: MatchPlayer })
  @Expose()
  matchStats: MatchPlayer[];
}
