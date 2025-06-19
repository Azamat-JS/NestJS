import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // COUnt
  @Get('count')
  countUsers(){
    return this.userService.countUsers()
  }

  @Get('count/admin')
  countAdmins(){
    return this.userService.countAdmins()
  }

  // limit

  @Get('limit/:num')
  limitUser(@Param('num') num: string){
    return this.userService.limitData(+num)
  }

  // Grouping
  @Get('group')
  groupData(){
    return this.userService.groupData()
  }

  @Get('select')
  groupUser(){
    return this.userService.select()
  }

  // order

  @Get('order/:age')
  orderUser(@Param('age') age: string){
    return this.userService.orderByAge(+age)
  }

  @Get('search')
  search(@Body() body: {letter:string, age: number}){
    console.log(body)
    return this.userService.search(body.letter, body.age)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


}
