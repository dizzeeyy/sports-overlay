import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateSportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
