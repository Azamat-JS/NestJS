import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  @Post()
 async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }

  @Get()
  async findAllPosts() {
    return await this.postsService.findAllPosts();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return await this.postsService.findOnePost(id);
  }

  @Put(':id')
 async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    return await this.postsService.removePost(id);
  }
}
