import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto";
import { Response } from "express";


@Controller()
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('/register')
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    };


    @Post('/login')
    async login(
        @Body() loginUser: {email:string, password:string},
        @Res({passthrough:true}) response:Response
){
        const loginRes = await this.userService.login(loginUser.email, loginUser.password)

        if(loginRes.success){
            response.cookie("access_token", loginRes.token, {httpOnly:true})
        }
        return loginRes
    };

    @Get("/verify/:otp/:email")
    async verifyEmail(@Param("otp") otp:string, @Param("email") email:string){
        return await this.userService.verifiyEmail(otp, email)
    }


}