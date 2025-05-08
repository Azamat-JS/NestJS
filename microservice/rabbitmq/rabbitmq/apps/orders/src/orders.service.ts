import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/createOrderRequest';
import { OrdersRepository } from './orders.repository';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository,
  @Inject(BILLING_SERVICE) private billingClient:ClientProxy){}

 async createOrder(request: CreateOrderRequest){
   const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await this.billingClient.emit('order_created', order);
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
 }
 
 async getOrders() {
  return this.ordersRepository.find({});
 }
  }

