import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import {ObjectId} from 'mongodb'

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>){}

 async createComment(createCommentDto: CreateCommentDto):Promise<Comment> {
    const {userId, postId, text} = createCommentDto
    const comment = await this.commentRepository.create({userId, postId, text})
    const result = this.commentRepository.save(comment)
    return result
  }

 async findAllComments():Promise<Comment[]> {
    const comments = await this.commentRepository.find()
    return comments
  }

 async findOneComment(id: string):Promise<Comment> {
   const comment = await this.commentRepository.findOne({
    where: {_id: new ObjectId(id)}
   })

   if(!comment) throw new NotFoundException("comment not found")

    return comment; 
  }

 async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOneComment(id)
     comment.text = updateCommentDto.text
     return await this.commentRepository.save(comment)
  }

 async removeComment(id: string) {
    const comment = await this.commentRepository.delete(id)
    if(comment.affected === 0) throw new NotFoundException("comment not found")
    return "Comment deleted successfully"
    
  }
}
