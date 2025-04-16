import { Module } from "@nestjs/common";
import { DrinkService } from "./drink.service";
import { DrinkController } from "./drink.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DrinkEntity } from "./entities/drink.entity";
import {ClientsModule, Transport} from "@nestjs/microservices"

@Module({
  imports: [
    TypeOrmModule.forFeature([DrinkEntity]),
    ClientsModule.register([
      {
        name: "DRINK_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
          queue: 'drink_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [DrinkController],
  providers: [DrinkService],
})
export class DrinkModule {}
