import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPost(userId: string, data: Prisma.GroupPostCreateWithoutUsersInput): Promise<{
        id: string;
        title: string;
        description: string;
        userId: string;
    }>;
    createGroupPost(userIds: string[], data: Prisma.GroupPostCreateWithoutUsersInput): Prisma.Prisma__GroupPostClient<{
        id: string;
        title: string;
        description: string;
    }, never, import("generated/prisma/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    getGroupPosts(): Prisma.PrismaPromise<({
        users: {
            user: {
                id: string;
                username: string;
                displayName: string | null;
            };
        }[];
    } & {
        id: string;
        title: string;
        description: string;
    })[]>;
}
