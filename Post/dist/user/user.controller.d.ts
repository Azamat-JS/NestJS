import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("./userEntity").User[]>;
    createUser(userData: any): Promise<import("./userEntity").User>;
    updateUser(id: string, userData: any): Promise<import("./userEntity").User>;
    deleteUser(id: string): Promise<string>;
}
