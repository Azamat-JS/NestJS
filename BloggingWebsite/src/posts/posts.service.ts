import { Injectable, NotFoundException, Req} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Post} from 'Schema/post-schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PostsService {
   constructor(@InjectModel(Post.name) private postModel: Model<Post>){}

 async create(createPostDto: CreatePostDto, userId:string):Promise<Post> {
    const post = new this.postModel({...createPostDto, createdBy:userId})
    return post.save()
  }

 async findAll():Promise<Post[]> {
    const posts = await this.postModel.find()
    return posts
  }

 async findOne(id: string):Promise<Post> {
  const post = await this.postModel.findById(id)
  if(!post) throw new NotFoundException("Post not found")
    return post
  }

 async update(id: string, updatePostDto: UpdatePostDto):Promise<Post> {
    const post = await this.postModel.findByIdAndUpdate(id, updatePostDto, {new:true})
    if(!post) throw new NotFoundException('Post not found')
      return post
  }

 async remove(id: string):Promise<string> {
  const post = await this.postModel.findByIdAndDelete(id)
  if(!post) throw new NotFoundException('Post not found')
    return `Post with id: ${id} deleted successfully`;
  }
}
