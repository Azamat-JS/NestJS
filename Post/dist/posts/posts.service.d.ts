import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
export declare class PostService {
    private postRepository;
    constructor(postRepository: Repository<Post>);
    createPost(createPostDto: CreatePostDto): Promise<Post>;
    findAllPosts(): Promise<Post[]>;
    findOnePost(id: string): Promise<Post>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    removePost(id: string): Promise<string>;
}
