import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreateEvent } from 'src/events/order-create.events';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  @OnEvent('order-created')
  remove(payload: OrderCreateEvent) {
    console.log('Product ordered and should be deleted from the DB', payload)
  }
}
