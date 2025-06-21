import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService){}

  async  createPost(userId: string, data: Prisma.PostCreateWithoutUserInput){
        const newPost = await this.prisma.post.create({data: {
            ...data,
            userId
        }});

        return newPost;
    }
}
