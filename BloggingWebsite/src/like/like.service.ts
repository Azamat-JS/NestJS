import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Like } from "Schema/like-schema";

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likePost(userId: string, postId: string): Promise<Like> {
    const existingLike = await this.likeModel.findOne({ userId, postId });
    if (existingLike) throw new Error("You already liked this post!");

    const like = new this.likeModel({ userId, postId });
    return like.save();
  }
  async unlikePost(userId: string, postId: string): Promise<{ message: string }> {
    const result = await this.likeModel.findOneAndDelete({ userId, postId });
    if (!result) throw new NotFoundException("You haven't liked this post.");

    return { message: "Like removed successfully" };
  }

  async countLikes(postId: string): Promise<number> {
    return this.likeModel.countDocuments({ postId }).exec();
  }

  async getUsersWhoLiked(postId: string): Promise<any[]> {
    return this.likeModel.find({ postId }).populate("userId", "username email").exec();
  }
}
