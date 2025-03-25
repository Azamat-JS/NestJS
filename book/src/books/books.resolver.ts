import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { FilterBookInput } from './dto/filter_book_input';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [BookEntity])
  async searchBooks(@Args('title') title:string):Promise<BookEntity[]>{
    return this.booksService.searchBooks(title)
  }

  @Query(() => [BookEntity])
    async recommendBooks(@Args('bookId') bookId:number):Promise<BookEntity[]>{
      return this.booksService.recommendBooks(bookId)
    }


  @Mutation(() => BookEntity)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [BookEntity], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => [BookEntity], { name: 'filter' })
  filterAll(@Args('filters', { type: () => FilterBookInput, nullable:true })filters: FilterBookInput){
    return this.booksService.filterAll(filters);
  }

  @Query(() => BookEntity, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => BookEntity)
  updateBook(@Args('bookId') bookId:number,@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(bookId, updateBookInput);
  }

  @Mutation(() => BookEntity)
 async removeBook(@Args('id', { type: () => Int }) id: number) {
    await this.booksService.remove(id);
    return 'Book deleted'
  }
}
