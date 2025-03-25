import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity, CategoryEntity])],
  providers: [BooksResolver, BooksService],
  exports:[TypeOrmModule]
})
export class BooksModule {}
