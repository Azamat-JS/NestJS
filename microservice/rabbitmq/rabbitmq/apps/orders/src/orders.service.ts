import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/createOrderRequest';
import { OrdersRepository } from './orders.repository';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository, @Inject('BILLING_SERVICE') private billingClient:ClientProxy){}
 async createOrder(request: CreateOrderRequest){
   return this.ordersRepository.create(request)
 }

 async getOrders() {
  return this.ordersRepository.find({});
 }
  }

