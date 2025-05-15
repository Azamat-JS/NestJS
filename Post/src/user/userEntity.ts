import { IsEmail, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";



@Entity()
export class User {
    @ObjectIdColumn()
    _id:ObjectId

    @Column()
    @IsNotEmpty()
    username:string

    @Column()
    @IsEmail()
    email:string

    @Column()
    password:string

    @CreateDateColumn()
    createdAt:Date
}