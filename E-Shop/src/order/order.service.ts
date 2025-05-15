import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderSchema } from '../schemas/order.schema';
import { Product } from '../schemas/product.schema';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(userId: string, products: { productId: string; quantity: number }[]): Promise<Order> {
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const productDoc = await this.productModel.findById(product.productId);
        if (!productDoc) {
          throw new Error(`Product with ID ${product.productId} not found`);
        }
        return {
          productId: productDoc,
          quantity: product.quantity,
          price: productDoc.price,
        };
      }),
    );

    const order = new this.orderModel({
      user: userId,
      products: productsWithDetails,
      totalPrice: productsWithDetails.reduce((total, product) => total + product.price * product.quantity, 0),
    });

    return order.save();
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return this.orderModel.find().populate('user products.productId').exec();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
        const order = await this.orderModel.findById(orderId).populate('user products.productId').exec();
        if(!order){
            throw new HttpException(`Order not found with id: ${orderId}`, HttpStatus.NOT_FOUND)
        }
        return order
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
          }
          
          throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOrder(orderId: string): Promise<string> {
    try {
        const order =await this.orderModel.findByIdAndDelete(orderId);
        if(!order){
            throw new HttpException(`Order not found with id: ${orderId}`, HttpStatus.NOT_FOUND)
        }
        return `Order with id: ${orderId} deleted successfully`
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
          }
          
          throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
