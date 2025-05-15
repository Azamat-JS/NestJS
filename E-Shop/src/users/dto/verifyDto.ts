import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  verificationCode: number;
}
