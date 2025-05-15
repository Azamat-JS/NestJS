import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos/createUserDto";

@Controller()
export class UsersMicroserviceController {
  @MessagePattern({ cmd: "createUser" })
  async createUser(@Payload() data: CreateUserDto) {
    console.log(data);
    
    return data;
  }
}
