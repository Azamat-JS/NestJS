import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({timestamps:true, versionKey:false})
export class User {
        @Prop({required:true, unique:true})
        name:string;
    
        @Prop({required:true})
        age:number;
}


export const UserSchema = SchemaFactory.createForClass(User)