import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}
  
    @Post()
    createPaymetn(@Body() createPaymentDto: CreatePaymentDto){
        this.natsClient.emit('createPayment', createPaymentDto)
    }
}
