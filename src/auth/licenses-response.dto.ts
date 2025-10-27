import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum LicensesStatus {
  OK = 'ok',
  ERROR = 'error',
}

export class LicensesResponseDto {
  @IsNotEmpty()
  @IsEnum(LicensesStatus)
  status: LicensesStatus;

  @IsNotEmpty()
  @IsString()
  sign: string;
}
