import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RecommendationService } from './recommendation.service';
import { RecommendationResolver } from './recommendation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), HttpModule],
  providers: [RecommendationResolver, RecommendationService],
})
export class RecommendationModule {}
