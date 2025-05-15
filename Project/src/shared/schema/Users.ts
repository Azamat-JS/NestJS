import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum userTypes {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    USER = "user",
    STUDENT = "student",
    TEACHER = "teacher"
}


@Schema({timestamps:true, versionKey:false})

export class Users extends Document {
    @Prop({type:String, required:[true, 'Name must be provided']})
    name:string;

    @Prop({type: String, required:[true, 'Email must be provided']})
    email:string;

    @Prop({type: String, required:[true, 'Password must be provided']})
    password:string;

    @Prop({type: String, default: userTypes.USER,
        enum: Object.values(userTypes)
    })
    type:userTypes;
    
    @Prop({default:false})
    isVerified:boolean;

    @Prop({ default:null})
    otp:string;
    
    @Prop({ default:null})
    otpExpireTime:Date
}

export const UsersSchema = SchemaFactory.createForClass(Users);