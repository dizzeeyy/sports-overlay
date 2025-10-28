import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum LicensesStatus {
  OK = 'ok',
  ERROR = 'error',
}

export class LicensesResponseDto {
  @IsNotEmpty()
  @IsEnum(LicensesStatus)
  @ApiProperty({ enum: LicensesStatus })
  status: LicensesStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'signature_example' })
  sign: string;
}
