import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";



@Entity()
export class User {
    @ObjectIdColumn()
    _id:ObjectId

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string

    @CreateDateColumn({type:"timestamp", default:Date})
    createdAt:Date
}