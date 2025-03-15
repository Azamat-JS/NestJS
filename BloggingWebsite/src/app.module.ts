import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as config from "config"
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, PostsModule,
    MongooseModule.forRoot(config.get("MONGO_URI")),
    ConfigModule.forRoot({
    isGlobal: true,
    load: [() => config]
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}