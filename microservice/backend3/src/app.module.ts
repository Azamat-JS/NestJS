import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinkModule } from './drink/drink.module';
import { DrinkEntity } from './drink/entities/drink.entity';
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
    entities: [DrinkEntity],
    synchronize:true
  }), DrinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
