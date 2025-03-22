export declare class UserResolver {
    getUser(): {
        id: number;
        username: string;
        email: string;
        password: string;
    }[];
    getUserById(id: number): {
        id: number;
        username: string;
        email: string;
        password: string;
    } | undefined;
}
