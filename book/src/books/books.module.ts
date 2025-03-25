import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity])],
  providers: [BooksResolver, BooksService],
  exports:[TypeOrmModule]
})
export class BooksModule {}
