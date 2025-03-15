import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user-schema';

@Schema({ timestamps: true, versionKey: false })
export class Post {
    @ApiProperty({ example: 'New Blog', description: 'valid title' })
    @Prop()
    title: string;

    @ApiProperty({ example: 'my text', description: 'valid text' })
    @Prop()
    text: string;

    @ApiProperty({ example: 'there is my description', description: 'valid description' })
    @Prop()
    description: string;

    @ApiProperty({ example: 'aklsdhlf93u23479aklk23', description: 'valid id' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
