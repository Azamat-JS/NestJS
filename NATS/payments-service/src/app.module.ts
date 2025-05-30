import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './typeorm/entities/Payment';
import { UserEntity } from './typeorm/entities/User';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres_db",
      port: 5432,
      username: "postgres",
      password: "azamat998877",
      database: "nestjsdb",
      entities: [PaymentEntity, UserEntity],
      synchronize:true
    }),
    PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
