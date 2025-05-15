import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './userEntity';
import { Repository } from 'typeorm';
import {ObjectId} from "mongodb"

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async getAllUsers():Promise<User[]>{
        const users = this.userRepository.find()
        return users
    }

    async createUser(userData:any):Promise<User>{
        const {email, username, password} = userData
        const newUser = await this.userRepository.create({email, username, password})
        const user = this.userRepository.save(newUser)
        return user
    }

    async getOne(id:string):Promise<User>{
        const data = await this.userRepository.findOne({
            where: {_id: new ObjectId(id)}
        });

        if(!data) throw new NotFoundException("user not found");

        return data;
    }

    async updateUser(id:string, userData:any):Promise<User>{
        const data = await this.getOne(id)

        data.username = userData.username
        data.email = userData.email
        data.password = userData.password

        return await this.userRepository.save(data)
    }

    async deleteUser(id:string):Promise<string>{
        const user = await this.userRepository.delete(id)
        
        if(user.affected === 0) throw new NotFoundException("user not found")

            return 'User deleted successfully'
    }
}
