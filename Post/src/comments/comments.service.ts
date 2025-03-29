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
    const comment = await this.commentRepository.create(createCommentDto)
    return comment
  }

 async findAllComment():Promise<Comment[]> {
    const comments = await this.commentRepository.find()
    return comments
  }

 async findOne(id: number):Promise<Comment> {
   const comment = await this.commentRepository.findOne({
    where: {_id: new ObjectId(id)}
   })

   if(!comment) throw new NotFoundException("comment not found")

    return comment; 
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
