import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductMicroServiceController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern("event")
  async event(data:string){
    console.log(data)
    return "event from emit"
  };

  @MessagePattern("salom")
  async salom(data:string){
    console.log(data)
    return "salom from send"
  };

  @EventPattern("product_created")
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @MessagePattern("product_updated")
 async update(@Payload() updateProductDto: UpdateProductDto) {
    if(!updateProductDto.id){
      throw new NotFoundException('Product id not found')
    }
   const product = await this.productService.update(+updateProductDto.id, updateProductDto);
   return product
  }


  @MessagePattern('product_deleted')
  remove(@Payload() id: string) {
    return this.productService.remove(+id);
  }
}

