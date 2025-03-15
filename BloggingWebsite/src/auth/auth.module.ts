import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'Schema/user-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  JwtModule.register({
    global:true,
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: process.env.JWT_TIME}
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
