import { Body, Controller, Get, HttpException, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/createUserDto';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}
    @Post()
   async createUser(@Body() createUserDto: CreateUserDto){
    return this.natsClient.send({cmd: 'createUser'}, createUserDto)      
    }

    @Get(':id')
  async getUserById(@Param('id') id: string){
        const user = await lastValueFrom(
            this.natsClient.send({cmd: 'getUserById'}, {userId: id})
        );
        if(user) return user;
        throw new HttpException('User not found', 404)
    }
}
