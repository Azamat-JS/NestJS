import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import {ObjectId} from 'mongodb'

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>){}

 async createPost(createPostDto: CreatePostDto):Promise<Post> {
    const {content, title, userId} = createPostDto
    const post = await this.postRepository.create({title, content, userId})
    const result = this.postRepository.save(post)
    return result
  }

 async findAllPosts():Promise<Post[]> {
    const posts = await this.postRepository.find()
    return posts
  }

 async findOnePost(id: string):Promise<Post> {
   const post = await this.postRepository.findOne({
    where: {_id: new ObjectId(id)}
   })

   if(!post) throw new NotFoundException("post not found")

    return post; 
  }

 async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOnePost(id)
    post.title = updatePostDto.title || post.title
    post.content = updatePostDto.content || post.content
     return await this.postRepository.save(post)
  }

 async removePost(id: string) {
    const post = await this.postRepository.delete(id)
    if(post.affected === 0) throw new NotFoundException("post not found")
    return "post deleted successfully"
    
  }
}