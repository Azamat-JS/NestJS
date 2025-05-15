import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal:true}),
    TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'postgres',
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    entities: [Product],
    synchronize:true
  }), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
