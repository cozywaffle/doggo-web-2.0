import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { DecryptedToken } from 'src/auth/dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createOne(dto: PostDto, userAuthData: DecryptedToken) {
    try {
      const post = await this.prisma.post.create({
        data: {
          content: dto.content,
          tags: dto.tags,
          image_url: dto.image_url,
        },
      });

      await this.prisma.post.update({
        where: { id: post.id },
        data: {
          authorId: userAuthData.sub,
        },
      });

      return await this.prisma.post.update({
        where: { id: post.id },
        data: {
          authorId: userAuthData.sub,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}