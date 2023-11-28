import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, DecryptedToken, LoginDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

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

      const payload = { sub: user.id, login: user.login };

      return this.signToken(payload);
    } catch (err) {
      throw new Error(err);
    }
  }

  async logIn(dto: LoginDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          login: dto.login,
        },
      });

      if (!user) throw new ForbiddenException('Credentials are incorrect');

      const pw_matches = await argon2.verify(user.hash, dto.password);

      if (!pw_matches)
        throw new ForbiddenException('Credentials are incorrect');

      const payload = { sub: user.id, login: user.login };

      return await this.signToken(payload);
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  async getUser(token: DecryptedToken): Promise<User> {
    try {
      const user = this.prismaService.user.findUnique({
        where: {
          login: token.login,
          id: token.sub,
        },
      });

      if (!user) throw new UnauthorizedException();

      delete (await user).hash;
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  private async signToken(payload: {
    sub: number;
    login: string;
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
