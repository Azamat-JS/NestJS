import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000, () => {
    console.log('WebSocket server is running on ws://localhost:4004');
  });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
}
bootstrap();
