import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getOne<Params extends { id: number; username: string }>({
    id,
    username,
  }: Params) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
          id,
        },
      });

      const posts = await this.prisma.post.findMany({
        where: {
          author: user,
        },
      });

      delete user.hash;
      delete user.login;

      if (!user) throw new BadRequestException('User is not found');

      return { userData: user, posts };
    } catch (error) {
      throw new Error(error);
    }
  }
}
