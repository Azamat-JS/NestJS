import { Args, Resolver, Query } from "@nestjs/graphql";
import { BookEntity } from "src/books/entities/book.entity";
import { RecommendationService } from "./recommendation.service";

@Resolver(() => BookEntity)
export class RecommendationResolver {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Query(() => [BookEntity])
  async recommendBooks(@Args('bookId') bookId: number): Promise<BookEntity[]> {
    const recommendations = await this.recommendationService.getMLRecommendations(bookId);
    
    return recommendations.map((book: any) => {
      return Object.assign(new BookEntity(), book);
    });
  }
}
