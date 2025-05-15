import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "filter/all-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "filter/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("My NestJS API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("users")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new HttpExceptionFilter(configService),
    new AllExceptionsFilter(httpAdapter)
  );

  await app.listen(PORT, () => {
    console.log("server is running on: " + PORT);
  });
}
bootstrap();
