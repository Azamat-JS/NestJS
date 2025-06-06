import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  id:number;
  
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)