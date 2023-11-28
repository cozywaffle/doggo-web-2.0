import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Public } from 'src/utils/global-token-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  logIn(@Body() dto: LoginDto) {
    return this.authService.logIn(dto);
  }

  @Get('me')
  getMe(@Req() req) {
    return this.authService.getUser(req.user);
  }
}
