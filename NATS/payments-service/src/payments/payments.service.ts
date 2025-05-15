import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/typeorm/entities/Payment';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserEntity } from 'src/typeorm/entities/User';

@Injectable()
export class PaymentsService {
    constructor(@InjectRepository(PaymentEntity) private paymentRepo: Repository<PaymentEntity>,
@Inject('NATS_SERVICE') private natsClient: ClientProxy,){}

   async createPayment({userId, ...createPaymentDto}: CreatePaymentDto){
        const user = await lastValueFrom<UserEntity>(this.natsClient.send({cmd: 'getUserById'}, {userId}))
        if(user){
            const newPayment = await this.paymentRepo.create({
                ...createPaymentDto, user})
            console.log(user)
            return this.paymentRepo.save(newPayment)
        }
        return null;
    }
}
