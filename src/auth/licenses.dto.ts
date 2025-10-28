import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { AuthType, Licenses, Status } from './licenses.entity';

export class LicensesDto {
  @IsNotEmpty()
  @IsString()
  api_key: string;

  @IsNotEmpty()
  @IsNumber()
  application_id: number;

  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @IsNotEmpty()
  @IsUrl()
  api_url: string;

  @IsNotEmpty()
  @IsString()
  api_license: string;

  @IsEnum(AuthType, {
    message: 'authorization_type must be either: "key" or "OAuth"',
  })
  authorization_type: AuthType;

  @IsNotEmpty()
  @IsString()
  sign: string;

  @IsString()
  @IsOptional()
  status: Status;
}
