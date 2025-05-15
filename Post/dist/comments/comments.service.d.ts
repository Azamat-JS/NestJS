import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
export declare class CommentsService {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
    createComment(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAllComments(): Promise<Comment[]>;
    findOneComment(id: string): Promise<Comment>;
    updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    removeComment(id: string): Promise<string>;
}
