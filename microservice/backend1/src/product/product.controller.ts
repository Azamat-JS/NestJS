import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly clientService: ClientProxy
  ) {}

  @Post()
 async create(@Body() createProductDto: CreateProductDto) {
  const product = await this.productService.create(createProductDto);
  this.clientService.emit("product_created", product);
  return product
  }

  @Post(":id/like")
 async like(@Param() id: string) {
  const product = await this.productService.findOne(+id)
  if(!product){
    throw new NotFoundException(`Product not found with id: ${id}`)
  }
  product.likes += 1
  this.productService.update(+id, product)
  return product
  }

  @Get()
  findAll() {
    this.clientService.emit('event', 'this is the emit event').subscribe((response) => {
      console.log(response);
    });

    this.clientService.send('event', 'this is the send event').subscribe((response) => {
      console.log(response)      
    })
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  await this.productService.update(+id, updateProductDto);
  const product = await this.productService.findOne(+id)
   this.clientService.send("product_updated", product)
   return product
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clientService.send('product_deleted', id)
    return this.productService.remove(+id);
  }
}
