import { IsArray, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  products: { productId: string; quantity: number }[];
}
