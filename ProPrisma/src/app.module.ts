import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { ProductModule } from './product/product.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    DatabaseModule,
    ProductModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
