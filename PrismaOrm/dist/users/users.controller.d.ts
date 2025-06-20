import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        displayName: string | null;
    }>;
    getUsers(): import("generated/prisma").Prisma.PrismaPromise<{
        id: string;
        username: string;
        displayName: string | null;
    }[]>;
    getUserById(id: string): Promise<{
        id: string;
        username: string;
        displayName: string | null;
    }>;
    updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        username: string;
        displayName: string | null;
    }>;
    deleteUserById(id: string): Promise<string>;
}
