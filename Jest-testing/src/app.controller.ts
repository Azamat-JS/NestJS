import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, User } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() body: { name: string; age: number }): User {
    return this.appService.createUser(body.name, body.age);
  }

  @Get(':name')
  findOne(@Param('name') name: string): User | undefined {
    return this.appService.findUser(name);
  }

  @Put(':name')
  update(
    @Param('name') name: string,
    @Body() body: { name?: string; age?: number },
  ): User | undefined {
    return this.appService.updateUser(name, body);
  }

  @Delete(':name')
  delete(@Param('name') name: string): boolean {
    return this.appService.deleteUser(name);
  }
}
