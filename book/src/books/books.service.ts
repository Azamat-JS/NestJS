import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Not, Repository } from 'typeorm';
import { FilterBookInput } from './dto/filter_book_input';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(BookEntity)
  private readonly bookRepository: Repository<BookEntity>,

  @InjectRepository(CategoryEntity)
  private readonly categoryRepository: Repository<CategoryEntity>
){}
  
  async create(createBookInput: CreateBookInput): Promise<BookEntity> {
    const { title, author, price, category } = createBookInput;
  
    let categoryEntity = await this.categoryRepository.findOne({ where: { name: category.name } });
  
    if (!categoryEntity) {
      categoryEntity = this.categoryRepository.create({ name: category.name });
      await this.categoryRepository.save(categoryEntity);
    }
  
  
    const newBook = this.bookRepository.create({
      title,
      author,
      price,
      category: categoryEntity,
    });
  
    return await this.bookRepository.save(newBook);
  }

  async searchBooks(title:string):Promise<BookEntity[]>{
    return this.bookRepository.find({
      where: {title: title},
      relations: ['category']
    })
  }

  async recommendBooks(bookId:number):Promise<BookEntity[]>{
    const book = await this.bookRepository.findOne({
      where: {id: bookId},
      relations: ['category']
    });

    if(!book) return [];

    return this.bookRepository.find({
      where: {category: book.category, id: Not(bookId)},
      take: 5
    })
  }

  async findAll(){
    return this.bookRepository.find()
  }

 async filterAll(filters:FilterBookInput):Promise<FilterBookInput[]> {
  const query = this.bookRepository.createQueryBuilder("book")

  if(filters.title){
    query.andWhere("LOWER(book.title) LIKE LOWER(:title)", {title: `%${filters.title}%`})
  }

  if(filters.minPrice){
    query.andWhere("book.price >= :minPrice", {minPrice: filters.minPrice})
  }

  if(filters.maxPrice){
    query.andWhere("book.price <= :maxPrice", {maxPrice: filters.maxPrice})
  }

  if(filters.sortBy){
    query.orderBy(`book.${filters.sortBy}`, filters.order?.toUpperCase() === "DESC" ? "DESC" : "ASC")
  }
    return query.getMany()
  }

  findOne(id: number) {
    return this.bookRepository.findOne({where: {id}})
  }

async update(id: number, updateBookInput: UpdateBookInput) {
    await this.bookRepository.update(id, updateBookInput)
    return await this.bookRepository.findOne({where: {id}})
  }

 async remove(id: number) {
   const result = await this.bookRepository.delete(id)
   if(result.affected === 0){
    throw new Error(`Book with id: ${id} not found`)
   }
    return 'Book deleted'
  }
}

//----------------- Recommendation

// const books = await this.bookRepository.createQueryBuilder('book')
// .where('book.genre = :genre', { genre: userLastReadGenre })
// .orderBy('book.rating', 'DESC')
// .limit(5)
// .getMany();


// const books = await this.bookRepository.createQueryBuilder('book')
// .orderBy('book.soldCopies', 'DESC') 
// .limit(5)
// .getMany();


// const books = await this.bookRepository.createQueryBuilder('book')
// .where('book.id != :id', { id: lastReadBookId })
// .andWhere('book.genre = :genre', { genre: lastReadGenre })
// .orderBy('book.rating', 'DESC')
// .limit(5)
// .getMany();

// const books = await this.bookRepository.createQueryBuilder('book')
// .where('book.price BETWEEN :minPrice AND :maxPrice', 
// { minPrice: 50000, maxPrice: 100000 })
// .orderBy('book.rating', 'DESC')
// .limit(5)
// .getMany();
