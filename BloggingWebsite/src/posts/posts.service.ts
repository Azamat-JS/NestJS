import { Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Post} from 'Schema/post-schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
   constructor(@InjectModel(Post.name) private userModel: Model<Post>){}
 async create(createPostDto: CreatePostDto) {
    const post = await this.userModel.create(createPostDto)
  }

 async findAll() {
    return `This action returns all posts`;
  }

 async findOne(id: number) {
    return `This action returns a #${id} post`;
  }

 async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

 async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
