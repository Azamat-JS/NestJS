import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category.schema";

export type ProductDocument = HydratedDocument<Product>

@Schema({timestamps:true, versionKey:false})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true })
  category: Category;
  
  @Prop()
  rating: number;

  @Prop({ required: true })
  brand: string;
  
  @Prop()
  price: number;
  
  @Prop({required:false})
  image?: string;
  
  @Prop({ type: mongoose.Schema.Types.Mixed, required:false })
  specs?: Record<string, any>;
  
  @Prop({required:false})
  description?: string;

  @Prop({type:Number, default: 0, required:false })
  likesCount?: number;
  
  @Prop({type:Number, default: 0, required:false })
  commentsCount?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)