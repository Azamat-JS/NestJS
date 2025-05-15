import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create.payment.dto';

@Controller('payments')
export class PaymentsMicroserviceController {
    @EventPattern('createPayment')
    createPayment(@Payload() createPaymentDto:CreatePaymentDto){
      console.log(createPaymentDto)
    }
}
