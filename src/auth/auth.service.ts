import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    // Prosta weryfikacja (tymczasowa, bez faktycznej bazy)
    if (username !== 'admin' || password !== 'password') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username, sub: username };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }
}
