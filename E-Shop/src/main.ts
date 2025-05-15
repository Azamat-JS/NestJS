import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from './Filters/allExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.urlencoded({ extended: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  app.setBaseViewsDir(join(process.cwd(), 'src', 'views')); 
  app.setViewEngine('ejs');

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
