import { ObjectId } from "mongodb";
export declare class Comment {
    _id: ObjectId;
    text: string;
    userId: ObjectId;
    postId: ObjectId;
    createdAt: Date;
}
