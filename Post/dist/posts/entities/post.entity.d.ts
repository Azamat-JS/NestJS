import { ObjectId } from "mongodb";
export declare class Post {
    _id: ObjectId;
    title: string;
    content: string;
    userId: ObjectId;
    createdAt: Date;
}
