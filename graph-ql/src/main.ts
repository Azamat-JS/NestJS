import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000
  await app.listen(PORT, () => {
    console.log('server is running on: http://localhost:4004/graphql')
  });
}
bootstrap();
