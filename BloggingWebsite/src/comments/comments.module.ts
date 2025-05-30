import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "Schema/comment-schema";
import { CommentService } from "./comments.service";
import { CommentController } from "./comments.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
