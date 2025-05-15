import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/typeorm/entities/Payment';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create.payment.dto';

@Injectable()
export class PaymentsService {
    constructor(@InjectRepository(PaymentEntity) private paymentRepo: Repository<PaymentEntity>){}

   async createPayment(createPaymentDto: CreatePaymentDto){
        const newPayment = await this.paymentRepo.create(createPaymentDto)
        console.log('success payment')
        return this.paymentRepo.save(newPayment)
    }
}
