import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/schemas/order.schema';
import { JwtGuard } from '../Guards/jwt.guard';
import { AdminGuard } from '../Guards/admin.guard';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: { userId: string; products: { productId: string; quantity: number }[] }): Promise<Order> {
    return this.orderService.createOrder(createOrderDto.userId, createOrderDto.products);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<string> {
    return this.orderService.deleteOrder(id);
  }
}
