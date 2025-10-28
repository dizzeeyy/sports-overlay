import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  username: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;
}
