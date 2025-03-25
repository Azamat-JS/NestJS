import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { BookEntity } from 'src/books/entities/book.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async purchaseBook(bookId: number, userId: string): Promise<PurchaseEntity> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new Error('Book not found');
    }

    const purchase = this.purchaseRepository.create({
      book,
      userId,
      formalized: false, // Not formalized initially
    });

    book.purchased = true; // Mark book as purchased
    await this.bookRepository.save(book);
    return await this.purchaseRepository.save(purchase);
  }

  async formalizePurchase(purchaseId: number): Promise<PurchaseEntity> {
    const purchase = await this.purchaseRepository.findOne({ where: { id: purchaseId } });

    if (!purchase) {
      throw new Error('Purchase not found');
    }

    purchase.formalized = true; // Mark as formalized
    return await this.purchaseRepository.save(purchase);
  }
}
