import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type LikeDocument = HydratedDocument<Like>;

@Schema({timestamps:true, versionKey:false})
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like)
