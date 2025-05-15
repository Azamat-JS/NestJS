import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(){
    return this.userService.getAllUsers()
  }

  @Post()
  async createUser(@Body() userData:any){
    return this.userService.createUser(userData)
  }

  @Put(":id")
  async updateUser(@Param("id") id:string, @Body() userData:any){
     return this.userService.updateUser(id, userData)
  }

  @Delete(":id")
  async deleteUser(@Param("id") id:string){
    return this.userService.deleteUser(id)
  }
}
