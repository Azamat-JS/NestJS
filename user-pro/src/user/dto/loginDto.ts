import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

  @ApiProperty({example: "ali@gmail.com", description: "Valid email"})
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({example: "ali1234", description: "Valid password"})
  @IsNotEmpty({message: 'Password field must not be empty'})
  @IsString()
  password: string;

}
