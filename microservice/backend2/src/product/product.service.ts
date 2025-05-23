import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>){}
  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: number) {
    return this.productModel.findOne({id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({id}, updateProductDto);
  }

  remove(id: number) {
    return this.productModel.findOneAndDelete({id});
  }
}
