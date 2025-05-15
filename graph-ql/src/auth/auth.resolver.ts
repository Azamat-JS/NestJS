import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/create-auth.input';
import { RegisterResponse } from './entities/res.auth';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello, GraphQL!';
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('createUserDto') createUserDto: RegisterInput
  ): Promise<RegisterResponse> {
    try {
      const { username, email, password, role } = createUserDto;

      const checkUser = await this.authService.findOneByUsername(username);
      if (checkUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const generatePassword = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 10)
      ).join("");

      await this.authService.sendVerificationEmail(email, generatePassword);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await this.authService.registerUser({
        username,
        email,
        password: hash,
        role,
        verify_code: generatePassword
      });

      return { message: 'User registered successfully', data: newUser };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Mutation(() => String)
  async login(
    @Args('email') email:string,
    @Args('password') password:string
  ):Promise<string>{
    const {token} = await this.authService.login(email, password)
    return token
  }

  @Mutation(() => String)
async forgotPassword(@Args('email') email: string): Promise<string> {
  await this.authService.forgotPassword(email);
  return 'Password reset link sent to your email';
}

@Mutation(() => String)
async resetPassword(
  @Args('token') token: string,
  @Args('newPassword') newPassword: string
): Promise<string> {
  await this.authService.resetPassword(token, newPassword);
  return 'Password reset successful';
}

}
