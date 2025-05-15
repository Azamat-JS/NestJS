import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role?: string = 'user';

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean = false;

  @IsOptional()
  @IsNumber()
  verificationCode?:number = 0;

  @IsOptional()
  @IsDateString()
  verificationCodeExpires?:Date;
}
