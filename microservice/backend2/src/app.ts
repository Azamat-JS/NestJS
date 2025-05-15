import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // First microservice: product queue
  const productService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
      queue: 'product11_queue',
      queueOptions: { durable: false },
    },
  });

  // Second microservice: drink queue
  const drinkService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
      queue: 'drink_queue',
      queueOptions: { durable: false },
    },
  });

  await productService.listen();
  await drinkService.listen();

  console.log(`Backend listening to product11_queue and drink_queue`);
}
bootstrap();
