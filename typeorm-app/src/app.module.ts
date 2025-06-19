import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [UserEntity, ProductEntity],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
