import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(@Body() product:CreateProductDto){
    return this.productsService.addProduct(product)
  }

  @Get()
  getAllProducts(){
    return this.productsService.getAllProducts()
  }

  @Get(':id')
  getOneProduct(@Param("id") id: number){
    return this.productsService.getOneProduct(id)
  }

  @Put(':id')
  updateProduct(@Param("id") id: number, @Body() data: UpdateProductDto){
    return this.productsService.updateProduct(id, data)
  }

  @Delete(':id')
  deleteProduct(@Param("id") id: number){
    return this.productsService.deleteProduct(id)
  }

}
