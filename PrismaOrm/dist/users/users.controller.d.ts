import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdateUserSettingsDto } from './dtos/updateUserSettings.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        displayName: string | null;
    }>;
    getUsers(): import("generated/prisma").Prisma.PrismaPromise<({
        userSetting: {
            id: string;
            notificationOn: boolean;
            smsEnabled: boolean;
            userId: string;
        } | null;
    } & {
        id: string;
        username: string;
        displayName: string | null;
    })[]>;
    getUserById(id: string): Promise<{
        userSetting: {
            notificationOn: boolean;
            smsEnabled: boolean;
        } | null;
        posts: {
            id: string;
            title: string;
            description: string;
            userId: string;
        }[];
    } & {
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
    updateUserSettings(id: string, data: UpdateUserSettingsDto): Promise<{
        id: string;
        notificationOn: boolean;
        smsEnabled: boolean;
        userId: string;
    }>;
}
