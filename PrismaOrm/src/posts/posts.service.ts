import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService){}

  async  createPost(userId: string, data: Prisma.GroupPostCreateWithoutUsersInput){
        const newPost = await this.prisma.post.create({data: {
            ...data,
            userId
        }});

        return newPost;
    }

    createGroupPost(
        userIds: string[],
        data: Prisma.GroupPostCreateWithoutUsersInput,

    ){
       return this.prisma.groupPost.create({data: {
            ...data,
            users: {
                create: userIds.map((userId) => ({userId}))
            }
        }})
    }

    getGroupPosts(){
        return this.prisma.groupPost.findMany({include: {users:{
            select: {
                user: true
            }
        }}})
    }
}
