import { Model } from "mongoose";
import { Users } from "src/shared/schema/Users";
import { CreateUserDto } from "./dto/createUserDto";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<Users>);
    create(createUserDto: CreateUserDto): Promise<{}>;
    verifiyEmail(email: string, otp: string): Promise<{
        success: boolean;
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            type: import("src/shared/schema/Users").userTypes;
        };
        token: string;
    }>;
    forgotPassword(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
