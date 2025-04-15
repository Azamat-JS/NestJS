import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import {ClientsModule, Transport} from "@nestjs/microservices"

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
          queue: 'product11_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
