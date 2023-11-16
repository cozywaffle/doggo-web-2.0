import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils/global-token-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Get('me')
  getMe(@Req() req) {
    return req.user;
  }
}
