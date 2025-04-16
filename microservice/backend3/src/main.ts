import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5002
  await app.listen(PORT, () => {
    console.log(`Backend3 is running on: ${PORT}`)   
  });
}
bootstrap();
