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
    getUsers(): Prisma.PrismaPromise<{
        id: string;
        username: string;
        displayName: string | null;
    }[]>;
    getUserById(id: string): Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        displayName: string | null;
    } | null, null, import("generated/prisma/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    updateUserById(id: string, data: Prisma.UserUpdateInput): Promise<{
        id: string;
        username: string;
        displayName: string | null;
    }>;
    deleteUserById(id: string): Promise<string>;
}
