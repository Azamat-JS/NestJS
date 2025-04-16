import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DrinkModule } from './drink/drink.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    ProductModule,
    DrinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
