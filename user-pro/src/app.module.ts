import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './utils/upload.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({envFilePath: ".env", isGlobal:true}),
    SequelizeModule.forRoot({
      dialect:'postgres',
      username: process.env.DB_USER,
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      database: process.env.DATABASE_NAME,
      password: process.env.DB_PASSWORD,
      models: [User],
      autoLoadModels:true,
      synchronize:true,
      logging:false
    }),
    UploadModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
