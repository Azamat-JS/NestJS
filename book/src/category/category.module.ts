import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryResolver, CategoryService],
  exports:[TypeOrmModule]
})
export class CategoryModule {}
