import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Follow extends Document {
  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  follower: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: "kjasdfl9898wek23jklkj", description: "valid id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  following: mongoose.Schema.Types.ObjectId;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);

