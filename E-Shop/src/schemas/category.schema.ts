// src/schemas/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>

@Schema({timestamps:true, versionKey:false})
export class Category {
  @Prop({ required: true, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
