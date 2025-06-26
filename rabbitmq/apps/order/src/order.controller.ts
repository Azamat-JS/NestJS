import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }

  @EventPattern('order-created')
  order(@Payload() order: any){
    console.log('Order service received new order', order)
  }
}
