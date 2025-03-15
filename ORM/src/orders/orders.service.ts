import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Order } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "src/products/dto/create_order.dto";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async makeOrder(order: CreateOrderDto): Promise<Order> {
    const checkProduct = await this.prisma.product.findUnique({
      where: { id: +order.productId },
    });

    if (!checkProduct)
      throw new NotFoundException("Such product is not available");

    if (checkProduct?.amount < order.amount)
      throw new BadRequestException(
        "There are not enough products based on your request"
      );

    const totalPrice = checkProduct.price * order.amount;
    const newAmount = checkProduct.amount - order.amount;

    await this.prisma.product.update({
      where: { id: +order.productId },
      data: { amount: newAmount },
    });

    return this.prisma.order.create({
      data: { productId: +order.productId, amount: order.amount, totalPrice },
    });
  }
}
