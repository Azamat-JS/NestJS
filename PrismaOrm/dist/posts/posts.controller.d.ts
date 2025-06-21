import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CreateGroupPostDto } from './dto/CreateGroupPost.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost({ userId, ...createPostData }: CreatePostDto): Promise<{
        id: string;
        title: string;
        description: string;
        userId: string;
    }>;
    createGroupPost({ userIds, ...createGroupPostData }: CreateGroupPostDto): import("generated/prisma").Prisma.Prisma__GroupPostClient<{
        id: string;
        title: string;
        description: string;
    }, never, import("generated/prisma/runtime/library").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    getGroupPosts(): import("generated/prisma").Prisma.PrismaPromise<({
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
