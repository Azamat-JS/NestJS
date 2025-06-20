import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto){
    return this.usersService.createUser(createUserDto)
  }

  @Get()
  getUsers(){
    return this.usersService.getUsers()
  }

  @Get(':id')
 async getUserById(@Param('id') id: string){
    const user = await this.usersService.getUserById(id);
    if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user
  }

  @Patch(':id')
  updateUserById(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto ){
   return this.usersService.updateUserById(id, updateUserDto)
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string){
    return this.usersService.deleteUserById(id)
  }
}
