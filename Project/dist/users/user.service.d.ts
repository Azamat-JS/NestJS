import { Model } from "mongoose";
import { Users } from "src/shared/schema/Users";
import { CreateUserDto } from "./dto/createUserDto";
import { SmsService } from "src/sms/sms.service";
export declare class UserService {
    private readonly userModel;
    private readonly smsService;
    constructor(userModel: Model<Users>, smsService: SmsService);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, Users> & Users & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    sendSMS(phone_number: string): Promise<import("axios").AxiosResponse<any, any> | undefined>;
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
