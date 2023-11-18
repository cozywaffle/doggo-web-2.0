import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PostsModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
