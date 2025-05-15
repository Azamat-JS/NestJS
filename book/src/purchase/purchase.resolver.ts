import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { PurchaseService } from './purchase.service';
import { PurchaseEntity } from './entities/purchase.entity';

@Resolver(() => PurchaseEntity)
export class PurchaseResolver {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Mutation(() => PurchaseEntity)
  purchaseBook(@Args('bookId', { type: () => Int }) bookId: number, @Args('userId') userId: string) {
    return this.purchaseService.purchaseBook(bookId, userId);
  }

  @Mutation(() => PurchaseEntity)
  formalizePurchase(@Args('purchaseId', { type: () => Int }) purchaseId: number) {
    return this.purchaseService.formalizePurchase(purchaseId);
  }
}
