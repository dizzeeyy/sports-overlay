import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Basketball' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://photos.com/basketball-icon.png' })
  icon?: string;
}
