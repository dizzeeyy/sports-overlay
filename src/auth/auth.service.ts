import {
  ConflictException,
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
import { exec } from 'child_process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Licenses)
    private readonly licensesRepository: Repository<Licenses>,
    private readonly configService: ConfigService,
  ) {}

  //do zmiany logika logowania na request z API.

  async buildDockerFiles(buildInfo: LicensesDto): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const buildCommand = `./docker-deployment.sh ${buildInfo.api_url} ${buildInfo.client_id} ${this.configService.get<string>('JWT_SECRET')} 3001 ${this.configService.get<string>('DB_PORT')}`; //${this.configService.get<string>('APP_PORT')}

      exec(buildCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing build command: ${error.message}`);
          return reject(new Error(`Failed to build Docker files ${stderr}`));
        } else {
          console.log(`Build command output: ${stdout}`);
          resolve({
            message: `Instance for ${buildInfo.client_id} deployed successfully.`,
          });
        }
      });
    });
  }

  async checkCredentials(credentials: LoginDto): Promise<LicensesDto | null> {
    const dbCredentials = this.licensesRepository.findOneBy({
      client_id: credentials.username,
    });
    if (!dbCredentials) {
      throw new NotFoundException('User not found');
    }
    return dbCredentials;
  }

  async checkLicense(api_key: string): Promise<LicensesDto | null> {
    const dbLicense = this.licensesRepository.findOneBy({ api_key });
    return dbLicense;
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
    const existingLicense = await this.checkLicense(licensesDto.api_key);

    if (existingLicense) {
      throw new ConflictException({
        status: LicensesStatus.ERROR,
        sign: existingLicense.sign,
      });
    }
    const newLicense = await this.licensesRepository.save(licensesDto);
    return {
      status: LicensesStatus.OK,
      sign: newLicense.sign,
    };
  }
}
