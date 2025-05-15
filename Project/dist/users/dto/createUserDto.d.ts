import { userTypes } from "src/shared/schema/Users";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    type: userTypes;
    secretToken?: string;
    isVerified?: boolean;
}
