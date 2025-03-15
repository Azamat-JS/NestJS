import { Controller, Post, Delete, Get, Param, Req, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "src/Guards/jwtAuth.guard";

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("likes")
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(":postId")
  likePost(@Param("postId") postId: string, @Req() req) {
    return this.likeService.likePost(req.user.id, postId);
  }

  @Delete(":postId")
  unlikePost(@Param("postId") postId: string, @Req() req) {
    return this.likeService.unlikePost(req.user.id, postId);
  }

  @Get("count/:postId")
  countLikes(@Param("postId") postId: string) {
    return this.likeService.countLikes(postId);
  }

  @Get("users/:postId")
  getUsersWhoLiked(@Param("postId") postId: string) {
    return this.likeService.getUsersWhoLiked(postId);
  }
}
