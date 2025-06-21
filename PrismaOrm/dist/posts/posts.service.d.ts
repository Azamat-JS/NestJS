import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPost(userId: string, data: Prisma.PostCreateWithoutUserInput): Promise<{
        id: string;
        title: string;
        description: string;
        userId: string;
    }>;
}
