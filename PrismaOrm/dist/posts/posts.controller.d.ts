import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost({ userId, ...createPostData }: CreatePostDto): Promise<{
        id: string;
        title: string;
        description: string;
        userId: string;
    }>;
}
