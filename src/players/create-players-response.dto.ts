import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { createPlayersDto } from './create-players.dto';

export class CreatePlayersResponseDto extends createPlayersDto {
  @IsBoolean()
  created: boolean;

  @IsString()
  @IsOptional()
  message?: string;
}
