import { Document } from "mongoose";
export declare enum userTypes {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    USER = "user",
    STUDENT = "student",
    TEACHER = "teacher"
}
export declare class Users extends Document {
    name: string;
    email: string;
    password: string;
    type: userTypes;
    isVerified: boolean;
    otp: string;
    otpExpireTime: Date;
}
export declare const UsersSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, Document<unknown, any, Users> & Users & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, Document<unknown, {}, import("mongoose").FlatRecord<Users>> & import("mongoose").FlatRecord<Users> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
