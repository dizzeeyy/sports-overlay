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
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  wins: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  loses: number;

  @IsBoolean()
  @IsNotEmpty()
  playoffs: boolean;

  @IsBoolean()
  @IsNotEmpty()
  champion: boolean;

  @IsString()
  @IsNotEmpty()
  teamName: string;
}
