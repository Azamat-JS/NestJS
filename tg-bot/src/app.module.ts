import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ ConfigModule.forRoot({envFilePath:".env", isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    BotModule],
})
export class AppModule {}
