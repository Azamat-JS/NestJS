import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth_dto/create-auth';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './auth_dto/login-auth';
import { JwtGuard } from 'src/Guards/jwtAuth.guard';
import { AdminGuard } from 'src/Guards/admin.guard';
import { UpdateUserDto } from './auth_dto/update-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({description: 'Registered'})
  @ApiBadRequestResponse({description: 'User already exists'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong!'})
  register(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.register(createUserDto)
  }
  
  @Post('login')
  @ApiOkResponse({description: 'Login successful'})
  @ApiUnauthorizedResponse({description: 'Unauthorized Error'})
  @ApiBadRequestResponse({description: 'Invalid credentials'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong!'})
  login(@Body() loginDto: LoginDto){
    return this.userService.login(loginDto)
  }
  
  @Get()
  @ApiOkResponse({description: 'Found all users'})
  @ApiNotFoundResponse({description: 'Users not found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong!'})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'User found'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong!'})
  findOne(@Param('id', new ParseUUIDPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'Updated successfully'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong!'})
  update(@Param('id', new ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Deleted Successfully'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Something went wrong!'})
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
