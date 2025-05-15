import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/userEntity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env', isGlobal:true}),
    TypeOrmModule.forRoot({
      type:"mongodb",
      host: 'localhost',
      url: process.env.MONGO_URI as string,
      synchronize:true,
      entities: [User, Comment, Post]
    }),
    UserModule,
    CommentsModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
