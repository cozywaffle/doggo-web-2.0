import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type Token = { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(authDto: AuthDto): Promise<Token> {
    try {
      const is_not_available = await this.prismaService.user.findUnique({
        where: {
          login: authDto.login,
        },
      });

      if (is_not_available)
        throw new ForbiddenException('Current credentials are not available');

      const hash = await argon2.hash(authDto.password);

      const user = await this.prismaService.user.create({
        data: {
          login: authDto.login,
          hash,
          username: authDto.username,
        },
      });

      const payload = { sub: user.id, login: user.login, hash: user.hash };

      return this.signToken(payload);
    } catch (err) {
      throw new Error(err);
    }
  }

  private async signToken(payload: {
    sub: number;
    login: string;
    hash: string;
  }): Promise<Token> {
    const secret = this.config.get('SECRET_KEY');

    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '31d',
        secret,
      }),
    };
  }
}
