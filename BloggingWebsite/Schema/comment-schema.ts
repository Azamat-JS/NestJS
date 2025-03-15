import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user-schema";
import { Post } from "./post-schema";

@Schema({ timestamps: true, versionKey: false })
export class Comment extends Document {
  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop()
  postId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: [true, `You should provide post id`]
  };

  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop()
  userId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: User;
    required: [true, `You should provide user id`];
  };

  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop()
  comment: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
