import { UpdateOrderDto } from './dto/update-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreateEvent } from 'src/events/order-create.events';
export declare class OrderService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    private readonly logger;
    create(newOrderEvent: OrderCreateEvent): void;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
