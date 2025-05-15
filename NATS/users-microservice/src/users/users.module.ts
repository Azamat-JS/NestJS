import { Module } from '@nestjs/common';
import { UsersMicroserviceController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersMicroserviceController],
  providers: [UsersService]
})
export class UsersModule {}
