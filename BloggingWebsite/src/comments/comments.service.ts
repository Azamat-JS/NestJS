import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "Schema/comment-schema";

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async createComment(userId: string, postId: string, text: string): Promise<Comment> {
    const comment = new this.commentModel({ userId, postId, comment: text });
    return comment.save();
  }

  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).populate("userId", "username email").exec();
  }

  async deleteComment(userId: string, commentId: string): Promise<{ message: string }> {
    const comment = await this.commentModel.findOne({ _id: commentId, userId });
    if (!comment) throw new NotFoundException("Comment not found or you are not the owner");

    await this.commentModel.findByIdAndDelete(commentId);
    return { message: "Comment deleted successfully" };
  }
}
