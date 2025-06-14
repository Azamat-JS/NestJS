import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:".env", isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    BotModule,
    UsersModule
  ],
  providers: [],
})
export class AppModule {}
