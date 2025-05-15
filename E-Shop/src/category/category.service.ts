// src/categories/categories.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryModel.create(createCategoryDto)
      if(!category){
        throw new HttpException('Category not created', HttpStatus.BAD_REQUEST)
      }
      return category
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
  
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<CategoryDocument[]> {
    try {
     return this.categoryModel.find()
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}

  async findOne(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto): Promise<Category> {
   try {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true, runValidators:true });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
   } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      { message: 'Something went wrong' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
   }
  }

  async remove(id:string):Promise<string> {
 try {
  const category = await this.categoryModel.findByIdAndDelete(id);
  if(!category){
    throw new HttpException(`Category not found with id: ${id}`, HttpStatus.NOT_FOUND)
  }
  return `Category with id: ${id} deleted successfully`
 } catch (error) {
  if (error instanceof HttpException) {
    throw error;
  }
  throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
 }
}

async searchByName(name: string): Promise<Category[]> {
  return this.categoryModel
    .find({ name: { $regex: new RegExp(name, 'i') } })
    .exec();
}
}
