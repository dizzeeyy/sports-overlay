import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;
}
