import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ORDER_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(ORDER_SERVICE) private readonly client: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('order')
  order(@Body() order: any){
    this.client.emit('order-created', order)
    return {msg: 'New order created', order}
  }
}
