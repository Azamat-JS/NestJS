import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local'
import {ConfigModule} from '@nestjs/config'
import { AppUpdate } from './app.controller';

const sessions = new LocalSession({database: 'session_db.json'})



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, envFilePath: '.env'}),
    TelegrafModule.forRoot({
    middlewares: [sessions.middleware()],
    token: process.env.TG_TOKEN as string,
  })],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
