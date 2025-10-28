import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from './public.decorator';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LicensesDto } from './licenses.dto';
import { LicensesResponseDto } from './licenses-response.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('license')
  @ApiOperation({
    summary: 'Adds license',
    description: 'Adds a license key to the application database.',
  })
  @ApiCreatedResponse({
    description: 'License added successfully.',
    type: LicensesResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid payload.' })
  async addLicense(
    @Body() licenses: LicensesDto,
  ): Promise<LicensesResponseDto> {
    return this.authService.addLicense(licenses);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'User login to obtain JWT token',
    description:
      'Logs in user, and returns JWT token to further authorize other requests.',
  })
  @ApiCreatedResponse({
    description: 'JWT token, to further authorize requests.',
    schema: {
      example: { accessToken: 'eyJhbGci0i15kSMsdj2jF...' },
    },
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
