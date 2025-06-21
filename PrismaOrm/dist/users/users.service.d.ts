import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(createUserInput: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        displayName: string | null;
    }, never, import("generated/prisma/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    getUsers(): Prisma.PrismaPromise<({
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
    getUserById(id: string): Prisma.Prisma__UserClient<({
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
    }) | null, null, import("generated/prisma/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    updateUserById(id: string, data: Prisma.UserUpdateInput): Promise<{
        id: string;
        username: string;
        displayName: string | null;
    }>;
    deleteUserById(id: string): Promise<string>;
    updateUserSettings(userId: string, data: Prisma.UserSettingUpdateInput): Promise<{
        id: string;
        notificationOn: boolean;
        smsEnabled: boolean;
        userId: string;
    }>;
}
