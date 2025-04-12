import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto";
import { Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    sendSMS(phone_number: string): Promise<import("axios").AxiosResponse<any, any> | undefined>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../shared/schema/Users").Users> & import("../shared/schema/Users").Users & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
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
