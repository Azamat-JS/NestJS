import { Module } from '@nestjs/common';
import { PaymentsMicroserviceController } from './payments.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/typeorm/entities/Payment';
import { UserEntity } from 'src/typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, UserEntity]),
    NatsClientModule],
  controllers: [PaymentsMicroserviceController],
  exports: [],
  providers: [PaymentsService]
})
export class PaymentsModule {}
