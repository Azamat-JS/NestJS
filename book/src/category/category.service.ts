import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>){}

 async create(createCategoryInput: CreateCategoryInput) {
    const newCategory = await this.categoryRepository.create(createCategoryInput)
    return await this.categoryRepository.save(newCategory)
  }

 async findAll() {
    return await this.categoryRepository.find()
  }

 async findOne(id: number) {
    const category = await this.categoryRepository.findOne({where: {id}})
    return category
  }

 async update(id: number, updateCategoryInput: UpdateCategoryInput) {
  if(!updateCategoryInput || Object.keys(updateCategoryInput).length === 0){
    throw new Error('No update values provided')
  }
     await this.categoryRepository.update(id, updateCategoryInput)  
  return this.categoryRepository.findOne({where: {id}})
  }

 async remove(id: number) {
    await this.categoryRepository.delete(id)
    return `Category with id: ${id} deleted successfully!`
  }
}
