import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true, versionKey: false })
export class Comment extends Document {
  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Post"})
  postId: mongoose.Schema.Types.ObjectId

  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  userId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop()
  comment: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
