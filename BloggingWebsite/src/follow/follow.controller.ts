import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/Guards/jwtAuth.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(":userId")
  follow(@Param("userId") userId:string, @Req() req){
return this.followService.followUser(req.user.id, userId)
  }

  @Delete(":userId")
  unfollow(@Param("userId") userId:string, @Req() req){
    return this.followService.unfollowUser(req.user.id, userId)
  }

  @Get('followers/:userId')
  getFollowers(@Param("userId") userId:string){
  return this.followService.getFollowers(userId)
  }

  @Get('following/:userId')
  getFollowing(@Param("userId") userId:string){
    return this.followService.getFollowing(userId)
  }
}
