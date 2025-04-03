import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto";
import { Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<{}>;
    login(loginUser: {
        email: string;
        password: string;
    }, response: Response): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            type: import("../shared/schema/Users").userTypes;
        };
        token: string;
    }>;
    verifyEmail(email: string, otp: string): Promise<{
        success: boolean;
        message: string;
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
