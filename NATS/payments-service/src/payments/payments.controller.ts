import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create.payment.dto';

@Controller('payments')
export class PaymentsMicroserviceController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}
    @EventPattern('createPayment')
    createPayment(@Payload() createPaymentDto:CreatePaymentDto){
      console.log(createPaymentDto)
      this.natsClient.emit('paymentCreated', createPaymentDto)
    }
}
