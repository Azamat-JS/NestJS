import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './users/user.module';
import { RedisModule } from './redis/redis.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisCacheInterceptor } from './redis/redis.interceptor';
import { SmsModule } from './sms/sms.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UserModule,
    RedisModule,
    SmsModule
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: RedisCacheInterceptor
  }],
})
export class AppModule {}
