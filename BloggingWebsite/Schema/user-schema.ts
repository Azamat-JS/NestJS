import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({timestamps:true, versionKey:false})
export class User extends Document {

    @ApiProperty({example: 'ali', description:'valid username'})
    @Prop({type:String, required:true})
    username: string;

    @ApiProperty({example: 'ali@gmail.com', description:'valid email'})
    @Prop({type:String, required:true})
    email: string;

    @ApiProperty({example:'ali1234', description:'valid password'})
    @Prop({type:String, required:true})
    password: string;

    @ApiProperty({example:'user', description: 'valid role'})
    @Prop({type:String, enum: ['admin', 'user'], default: 'user'})
    role:string;
}

export const UserSchema = SchemaFactory.createForClass(User)