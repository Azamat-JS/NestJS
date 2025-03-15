import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/products/dto/create_order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  makeOrder(@Body() order:CreateOrderDto){
  return this.ordersService.makeOrder(order)
  }
}
