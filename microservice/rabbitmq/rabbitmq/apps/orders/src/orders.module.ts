import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './apps/orders/.env',
    validationSchema: Joi.object({
    MONGODB_URI: Joi.string().required(),
    PORT: Joi.number().required()
  }),
}),
DatabaseModule,
 MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
 RmqModule.register({name: BILLING_SERVICE}),
],  
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})


export class OrdersModule {}

