import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  findAllComments() {
    return this.commentsService.findAllComments();
  }

  @Get(':id')
  findOneComment(@Param('id') id: string) {
    return this.commentsService.findOneComment(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.commentsService.removeComment(id);
  }
}
