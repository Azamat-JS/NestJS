import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreateEvent } from 'src/events/order-create.events';

@Injectable()
export class OrderService {
  constructor(private readonly eventEmitter: EventEmitter2){}
  private readonly logger = new Logger(OrderService.name)
  create(newOrderEvent: OrderCreateEvent) {
    this.logger.log('New order is creating...')
    this.eventEmitter.emit('order-created', newOrderEvent)
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
