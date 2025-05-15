import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos/createUserDto";
import { UsersService } from "./users.service";

@Controller()
export class UsersMicroserviceController {
  constructor(private usersService: UsersService){}

  @MessagePattern({ cmd: "createUser" })
  async createUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data)
  }

  @MessagePattern({cmd: 'getUserById'})
 async getUserById(@Payload() data){
    const {userId} = data;
    return await this.usersService.getUserById(userId);
  }

  @EventPattern('paymentCreated')
  paymentCreated(@Payload() data: any){
    console.log(data)
  }
}
