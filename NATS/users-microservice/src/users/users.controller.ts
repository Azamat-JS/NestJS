import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos/createUserDto";

@Controller()
export class UsersMicroserviceController {
  @MessagePattern({ cmd: "createUser" })
  async createUser(@Payload() data: CreateUserDto) {
    console.log(data);
    
    return data;
  }

  @EventPattern('paymentCreated')
  paymentCreated(@Payload() data: any){
    console.log(data)
  }
}
