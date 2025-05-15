import { ObjectId } from "mongodb";
export declare class User {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}
