import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from 'Schema/post-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
  JwtModule.register({
    global:true,
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: process.env.JWT_TIME}
  })],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
