import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    private readonly httpService: HttpService
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post(":id/like")
 async like(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    if(!product){
      throw new NotFoundException(`Product not found with id: ${id}`)
    }

    product.likes += 1
    await product.save()

    try {
      this.httpService.post(`http://localhost:3000/${id}/like`).subscribe((response) => {
        console.log(response)
      })
    } catch (error) {
      console.error(error)
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

