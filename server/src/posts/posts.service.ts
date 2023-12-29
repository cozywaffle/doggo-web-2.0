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
      include: {
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
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      });
      return post;
    } catch (error) {
      throw new error(error);
    }
  }

  async getSorted(category: string) {
    try {
      const cases = ['popular', 'most-liked', 'most-disliked', 'latest'];

      switch (category) {
        case cases[0]:
          return await this.prisma.post.findMany({
            orderBy: [{ views: 'desc' }],
            include: {
              author: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          });
        case cases[1]:
          return await this.prisma.post.findMany({
            orderBy: [{ likes: 'desc' }],
            include: {
              author: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          });
        case cases[2]:
          return await this.prisma.post.findMany({
            orderBy: [{ dislikes: 'desc' }],
            include: {
              author: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          });
        case cases[3]:
          return await this.prisma.post.findMany({
            orderBy: [{ id: 'desc' }],
            include: {
              author: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          });

        default:
          break;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
