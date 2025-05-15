import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class CreateUserDto {
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

  @ApiProperty({enum: ['admin', 'user'], example: "admin", description: "Valid role"})
  @IsString()
  @IsEnum(['admin', 'user'], {message: 'Role must be either admin or user'})
  role:string;

  @IsString()
  @IsOptional()
  image?:string;
}
