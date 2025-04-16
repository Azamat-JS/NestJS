import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DrinkDocument = HydratedDocument<Drink>;

@Schema()
export class Drink {
  @Prop()
  id:number;
  
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  likes: number;
}

export const DrinkSchema = SchemaFactory.createForClass(Drink)