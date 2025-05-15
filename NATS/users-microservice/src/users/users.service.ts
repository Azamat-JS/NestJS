import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUserDto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>){}

   async createUser(createUserDto: CreateUserDto){

        const newUser = await this.usersRepo.create(createUserDto)
        console.log('success');        
        return this.usersRepo.save(newUser)
    }

   async getUserById(userId: string){
        return this.usersRepo.findOne({where: {id: userId}, relations: ['payments']})
    }
}
