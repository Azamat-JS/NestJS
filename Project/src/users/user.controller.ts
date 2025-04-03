import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto";


@Controller()
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('/register')
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

}