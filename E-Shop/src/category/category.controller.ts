// src/categories/categories.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtGuard } from '../Guards/jwt.guard';
import { AdminGuard } from '../Guards/admin.guard';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('search')
  async searchCategory(@Query('name') name: string) {
    return this.categoriesService.searchByName(name);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

}
