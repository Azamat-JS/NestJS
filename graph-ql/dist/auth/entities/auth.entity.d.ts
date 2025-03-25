export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    verify_code?: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
}
