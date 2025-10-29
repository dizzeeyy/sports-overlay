import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { AuthType, Licenses, Status } from './licenses.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LicensesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_api_key_here' })
  api_key: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 123456 })
  application_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 78910 })
  client_id: number;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ example: 'https://yourapiurl.com/' })
  api_url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_api_license_here' })
  api_license: string;

  @IsEnum(AuthType, {
    message: 'authorization_type must be either: "key" or "OAuth"',
  })
  @ApiProperty({ example: AuthType })
  authorization_type: AuthType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'signature_example' })
  sign: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: Status, required: false })
  status: Status;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ example: ['scope1', 'scope2'], required: false })
  scope?: string[];
}
