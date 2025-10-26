import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateSportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Basketball' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://photos.com/basketball-icon.png' })
  icon?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:
      'A team sport where two teams, most commonly of five players each, oppose each other on a rectangular court.',
  })
  description?: string;
}
