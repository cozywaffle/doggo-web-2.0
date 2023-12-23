import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { DecryptedToken } from 'src/auth/dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createOne(dto: PostDto, userAuthData: DecryptedToken) {
    try {
      const { username } = await this.prisma.user.findUnique({
        where: { id: userAuthData.sub, login: userAuthData.login },
      });

      const post = await this.prisma.post.create({
        data: {
          content: dto.content,
          tags: dto.tags,
          image_url: dto.image_url,
          authorId: userAuthData.sub,
        },
      });

      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        content: true,
        tags: true,
        image_url: true,
        likes: true,
        dislikes: true,
        created_at: true,
        updated_at: true,
        authorId: true,
        author: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });

    return posts;
  }
}
