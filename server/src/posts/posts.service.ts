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
          title: dto.title,
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
        title: true,
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

  async getOne(id: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });
      return post;
    } catch (error) {
      throw new error(error);
    }
  }

  async getSorted(category: string) {
    try {
      if (category === 'popular') {
        return await this.prisma.post.findMany({
          orderBy: [{ views: 'desc' }],
        });
      }
      if (category === 'most liked') {
        return await this.prisma.post.findMany({
          orderBy: [{ likes: 'desc' }],
        });
      }
      if (category === 'most disliked') {
        return await this.prisma.post.findMany({
          orderBy: [{ dislikes: 'desc' }],
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
