import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/Guards/jwtAuth.guard';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
