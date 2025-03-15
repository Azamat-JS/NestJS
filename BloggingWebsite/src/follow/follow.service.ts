import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow } from 'Schema/follow-schema';

@Injectable()
export class FollowService {
    constructor(@InjectModel(Follow.name) private followModel: Model<Follow>){}

    async followUser(followerId:string, followingId:string):Promise<Follow>{
        if(followerId === followingId) throw new BadRequestException('You can not follow yourself')

     const alreadyFollowing = await this.followModel.findOne({follower:followerId, following:followingId})
    if(alreadyFollowing) throw new BadRequestException('You are already following this user!')

        const follow = new this.followModel({follower:followerId, following:followingId})
        return follow.save()
    }

   async unfollowUser(followerId:string, followingId:string):Promise<{message:string}>{
        const result = await this.followModel.findByIdAndDelete({follower:followerId, following:followingId})
       if(!result) throw new NotFoundException('You are not following this user')

        return {message: 'Successfully unfollowed user'}
    }

    async getFollowers(userId:string):Promise<any[]>{
        return this.followModel.find({following:userId}).populate('follower', 'username, email')
    }

    async getFollowing(userId:string):Promise<any>{
        return this.followModel.find({follower:userId}).populate('following', 'username, email')
    }
}
