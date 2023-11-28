import { Body, Controller, Post, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/posts.dto';
import { User } from 'src/utils/decrypt-token';
import { DecryptedToken } from 'src/auth/dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  createPost(@Body() dto: PostDto, @User() user: DecryptedToken) {
    return this.postsService.createOne(dto, user);
  }
}
