import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      // ❌ no exclude
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 60,
      }),
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    UploadModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
