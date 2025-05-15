import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Render, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/loginDto';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { VerifyUserDto } from './dto/verifyDto';
import { AdminGuard } from '../Guards/admin.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post("login")
  login(@Body() loginDto:LoginDto  ) {    
    return this.usersService.login(loginDto);
  }

  
  @Post('verify')
  async verifyUser(@Body() verifyDto: VerifyUserDto){
    return this.usersService.verifyUser(verifyDto)
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email:string){
    return this.usersService.forgetPassword(email)
  }

  @Get('reset-password/:token')
  @Render('reset-password')
  async accessToPassword(@Param('token') token:string){
    return this.usersService.accessToPassword(token)
  }

  
  @Post('reset-password')
  async handleResetPassword(@Req() req: Request, @Res() res: Response) {
    const { token, password, confirm } = req.body;
    
    if (password !== confirm) {
      return res.render('reset-password', { token, message: 'Passwords do not match' });
    }
  
    try {
      await this.usersService.resetPassword({ token, password });

      res.send('Password successfully reset. You can now log in.');
    } catch (error) {
      return res.render('reset-password', {
        token,
        message: error.message || 'Something went wrong.',
      });
    }
  }
  
  @Get()
 async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    return this.usersService.findAll(pageNum, limitNum);
  }

  @Get('search')
  async searchUser(@Query('name') name: string) {
    return this.usersService.searchByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


@UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

@UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
