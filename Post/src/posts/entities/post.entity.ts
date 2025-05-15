import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Post {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  userId: ObjectId;

  @CreateDateColumn({ type: "timestamp", default: Date })
  createdAt: Date;
}
