import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createReviewDto: Prisma.ReviewCreateInput) {
    return this.databaseService.review.create({ data: createReviewDto });
  }

 async findAll() {
    return this.databaseService.review.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.review.findUnique({
      where: {id}
    })
  }

 async update(id: number, createReviewDto: Prisma.ReviewUpdateInput) {
    return this.databaseService.review.update({
      where: {id}, data: createReviewDto
    });
  }

 async remove(id: number) {
    return this.databaseService.review.delete({
      where: {id}
    });
  }
}
