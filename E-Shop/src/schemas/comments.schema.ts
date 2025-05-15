import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CommentDocument = HydratedDocument<Comment>

@Schema({timestamps:true, versionKey:false})
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  text: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)
