import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
