import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Licenses } from './licenses.entity';
import { Repository } from 'typeorm';
import { LicensesDto } from './licenses.dto';
import { LicensesResponseDto, LicensesStatus } from './licenses-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Licenses)
    private readonly licensesRepository: Repository<Licenses>,
  ) {}

  //do zmiany logika logowania na request z API.

  async checkCredentials(credentials: LoginDto): Promise<LicensesDto | null> {
    const dbCredentials = this.licensesRepository.findOneBy({
      client_id: credentials.username,
    });
    if (!dbCredentials) {
      throw new NotFoundException('User not found');
    }
    return dbCredentials;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    const loggedUser = await this.checkCredentials(loginDto);

    // Prosta weryfikacja (tymczasowa, bez faktycznej bazy)
    if (
      !loggedUser ||
      username !== loggedUser.client_id ||
      password !== loggedUser.sign
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username, sub: username };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }

  async addLicense(licensesDto: LicensesDto): Promise<LicensesResponseDto> {
    const newLicense = await this.licensesRepository.save(licensesDto);
    return {
      status: LicensesStatus.OK,
      sign: newLicense.sign,
    };
  }
}
