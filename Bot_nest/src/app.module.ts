import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local'
import {ConfigModule} from '@nestjs/config'
import { AppUpdate } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TaskEntity } from './entities/task.entity';

const sessions = new LocalSession({database: 'session_db.json'})



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, envFilePath: '.env'}),
    TelegrafModule.forRoot({
    middlewares: [sessions.middleware()],
    token: process.env.TG_TOKEN as string,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database:  process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    entities: [TaskEntity],
    migrations: [join(__dirname, '**', '*.migration.{ts.js}')],
    synchronize:true
  }),
  TypeOrmModule.forFeature([TaskEntity])
],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
