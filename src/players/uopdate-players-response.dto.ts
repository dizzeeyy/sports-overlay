import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UpdatePlayersDto } from './update-players.dto';
import { Expose } from 'class-transformer';

export class UpdatePlayersResponseDto extends UpdatePlayersDto {
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  updated: boolean;

  @IsString()
  @IsNotEmpty()
  @Expose()
  message: string;
}
