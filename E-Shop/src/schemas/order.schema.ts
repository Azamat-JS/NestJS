import mongoose, { Schema, Document } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';


export interface Order extends Document {
  user: User;
  products: { productId: Product; quantity: number; price: number }[];
  totalPrice: number;
  createdAt: Date;
}


export const OrderSchema = new Schema<Order>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  let totalPrice = 0;
  this.products.forEach(product => {
    totalPrice += product.price * product.quantity;
  });
  this.totalPrice = totalPrice;
  next();
});


export const Order = mongoose.model<Order>('Order', OrderSchema);
