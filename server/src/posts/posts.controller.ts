import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/posts.dto';
import { User } from 'src/utils/decrypt-token';
import { DecryptedToken } from 'src/auth/dto';
import { Public } from 'src/utils/global-token-decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  createPost(@Body() dto: PostDto, @User() user: DecryptedToken) {
    return this.postsService.createOne(dto, user);
  }

  @Public()
  @Get('getall')
  getAll() {
    return this.postsService.getAll();
  }

  @Public()
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getOne(id);
  }

  @Public()
  @Get('posts/:category')
  getSorted(@Param('category') category: string) {
    return this.postsService.getSorted(category);
  }
}
