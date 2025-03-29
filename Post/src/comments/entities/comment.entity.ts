import { ObjectId } from "mongodb"
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm"


@Entity()
export class Comment {
        @ObjectIdColumn()
        _id:ObjectId
    
        @Column()
        text:string
    
        @Column()
        userId:ObjectId
    
        @Column()
        postId:ObjectId
    
        @CreateDateColumn({type:"timestamp", default:Date})
        createdAt:Date
}
