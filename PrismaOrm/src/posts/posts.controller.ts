import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CreateGroupPostDto } from './dto/CreateGroupPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() {userId, ...createPostData}: CreatePostDto){
    return this.postsService.createPost(userId, createPostData)
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() {userIds, ...createGroupPostData}: CreateGroupPostDto){
    return this.postsService.createGroupPost(userIds, createGroupPostData)
  }

  @Get('group')
  getGroupPosts(){
    return this.postsService.getGroupPosts()
  }
}
