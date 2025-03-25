import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService } from './purchase.service';
import { PurchaseResolver } from './purchase.resolver';
import { PurchaseEntity } from './entities/purchase.entity';
import { BookEntity } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseEntity, BookEntity])],
  providers: [PurchaseService, PurchaseResolver],
})
export class PurchaseModule {}
