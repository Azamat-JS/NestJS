import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user-schema";
import { Post } from "./post-schema";

@Schema({ timestamps: true, versionKey: false })
export class Like extends Document{
  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Post"})
  postId: mongoose.Schema.Types.ObjectId

  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  userId: mongoose.Schema.Types.ObjectId
}

export const LikeSchema = SchemaFactory.createForClass(Like);
