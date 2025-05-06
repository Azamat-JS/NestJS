import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from '@nestjs/sequelize'
import { User } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), 
  JwtModule.register({
    global:true,
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: process.env.JWT_TIME}
  }),
  S3Module
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
