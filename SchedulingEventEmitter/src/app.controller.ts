import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post()
  // async createUser(@Body() body: CreateUserDto): Promise<void>{
  //   return this.appService.createUser(body)
  // }

  @Post('auth')
  async createAuth(@Body() data: CreateUserDto){
    return this.appService.createAuth(data)
  }
}
