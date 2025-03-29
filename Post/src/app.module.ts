import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/userEntity';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env', isGlobal:true}),
    TypeOrmModule.forRoot({
      type:"mongodb",
      url: process.env.MONGO_URI as string,
      synchronize:true,
      entities: [User]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
