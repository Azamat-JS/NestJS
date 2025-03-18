import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type StudentDocument = Student & Document

@Schema()
export class Student {
    @Prop({required:true, unique:true})
    chatId:number;

    @Prop({required:true})
    name:string;
}

export const StudentSchema = SchemaFactory.createForClass(Student)