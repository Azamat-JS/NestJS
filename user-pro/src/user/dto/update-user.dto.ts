import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({example: "Ali", description: "Valid username"})
      @IsString()
      username: string;
    
      @ApiProperty({example: "ali@gmail.com", description: "Valid email"})
      @IsNotEmpty({ message: 'Email cannot be empty' })
      @IsEmail()
      email: string;
    
      @ApiProperty({example: "ali1234", description: "Valid password"})
      @IsNotEmpty({message: 'Password field must not be empty'})
      @IsString()
      password: string;
    
      @ApiProperty({enum: ['admin', 'user'], example: "Ali", description: "Valid role"})
      @IsString()
      @IsEnum(UserRole, {message: 'Role must be either admin or user'})
      role:string;

      @IsString()
      image: string
}
