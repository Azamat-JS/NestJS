import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/createOrderRequest';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() request: CreateOrderRequest){
      return this.ordersService.createOrder(request);
    }

  @Get()
  async getOrders(){
    return this.ordersService.getOrders()
  }
}
