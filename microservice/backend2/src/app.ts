import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
      queue: 'product11_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
