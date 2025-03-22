import { UserSetting } from "./UserSetting";
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    settings?: UserSetting;
}
