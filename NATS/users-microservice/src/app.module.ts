import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/entities/User';
import { PaymentEntity } from './typeorm/entities/Payment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres_db",
      port: 5432,
      username: "postgres",
      password: "azamat998877",
      database: "nestjsdb",
      entities: [UserEntity, PaymentEntity],
      synchronize:true
    }),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
