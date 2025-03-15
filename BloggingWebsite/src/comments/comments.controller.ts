import { Controller, Post, Delete, Get, Param, Body, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "src/Guards/jwtAuth.guard";
import { CommentService } from "./comments.service";

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Post(":postId")
  addComment(@Param("postId") postId: string, @Req() req, @Body("comment") comment: string) {
    return this.commentService.createComment(req.user.id, postId, comment);
  }


  @Get(":postId")
  getComments(@Param("postId") postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }
t
  @Delete(":commentId")
  deleteComment(@Param("commentId") commentId: string, @Req() req) {
    return this.commentService.deleteComment(req.user.id, commentId);
  }
}
