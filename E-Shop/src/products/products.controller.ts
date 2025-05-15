import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { JwtGuard } from '../Guards/jwt.guard';
import { AdminGuard } from '../Guards/admin.guard';
import { CommentDto } from './dto/commentDto'

@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
  
    if (pageNum <= 0 || limitNum <= 0) {
      throw new HttpException(
        { message: 'Page and limit must be positive integers.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  
    return this.productsService.findAll(pageNum, limitNum)
  };

  @Get('search')
  async searchProduct(@Query('name') name: string) {
    return this.productsService.searchByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }
  
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('/:productId/like')
  likeProduct(@Param('productId') productId: string, @Req() request: Request) {
    const userId = request['user'].sub;
    return this.productsService.likeProduct(productId, userId);
  }

  @Post('/:productId/comment')
  commentProduct(
    @Param('productId') productId: string,
    @Req() request: Request,
    @Body() commentDto: CommentDto
  ) {
    const userId = request['user'].sub;
    return this.productsService.commentProduct(userId, productId, commentDto.text);
  }
}
