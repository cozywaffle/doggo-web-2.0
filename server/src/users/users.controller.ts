import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/utils/global-token-decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get('/:id/:username')
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('username') username: string,
  ) {
    return this.usersService.getOne({ id, username });
  }
}
