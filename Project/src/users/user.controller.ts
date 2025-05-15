import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto";
import { Response } from "express";
import { RedisService } from "src/redis/redis.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}


  // send SMS
  @Get()
  async sendSMS(@Body("phone_number") phone_number:string){
     return this.userService.sendSMS(phone_number)
  }
  // Get All Users
  @Get('/getUsers')
  async getAllUsers(){
    return this.userService.getAllUsers()
  }
  /// Register
  @Post("/register")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //// Login
  @Post("/login")
  async login(
    @Body() loginUser: { email: string; password: string },
    @Res({ passthrough: true }) response: Response
  ) {
    const loginRes = await this.userService.login(
      loginUser.email,
      loginUser.password
    );

    if (loginRes.success) {
      response.cookie("access_token", loginRes.token, { httpOnly: true });
    }
    return loginRes;
  }

  ///////// Verify Email
  @Get("/verify/:email/:otp")
  async verifyEmail(@Param("email") email: string, @Param("otp") otp: string) {
    return await this.userService.verifiyEmail(email, otp);
  }

  //// Forgot password
  @Post("/forgot-password")
  async forgotPassword(@Body("email") email: string) {
    return await this.userService.forgotPassword(email);
  }

  /// Reset password
  @Post("/reset-password")
  async resetPassword(
    @Body("email") email: string,
    @Body("otp") otp: string,
    @Body("newPassword") newPassword: string
  ) {
    return await this.userService.resetPassword(email, otp, newPassword);
  }
}
