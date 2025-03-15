import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

@Injectable()
export class ProductsService {
constructor(private prisma:PrismaService){}

async addProduct(product:CreateProductDto):Promise<Product>{
    return await this.prisma.product.create({data: product})
  }


    async getAllProducts():Promise<Product[]>{
        try {
            return await this.prisma.product.findMany()
        } catch (error) {
            if(error instanceof HttpException){
                throw error
            }
            console.error(error)
            throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }

      async getOneProduct(id:number):Promise<Product>{
      const product = await this.prisma.product.findUnique({where: {id: +id}})

      if(!product) throw new NotFoundException('Product not found')
        return product
      }

      async updateProduct(id:number, data: UpdateProductDto):Promise<Product>{
      const product = await this.prisma.product.update({where: {id: +id}, data})

      if(!product) throw new NotFoundException('Product not found')
        return product
      }

      async deleteProduct(id:number):Promise<string>{
      const product = await this.prisma.product.delete({where: {id: +id}})

      if(!product) throw new NotFoundException('Product not found')
        return "Product deleted successfully"
      }

}
