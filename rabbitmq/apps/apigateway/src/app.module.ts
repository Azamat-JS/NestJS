import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from './constants';
import { dump } from 'pm2';

@Module({
  imports: [ClientsModule.register([
    {
      name: ORDER_SERVICE,
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://guest:guest@localhost:5672"],
        queue: "order_queue",
        queueOptions: {
          durable: true
        }
      }
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
