import { CreateCategoryInput } from 'src/category/dto/create-category.input';
import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field({nullable:true})
  title?: string;

  @Field(() => Float, {nullable:true})
  price?: number;

  @Field({ nullable: true }) 
  author?: string;

  @Field(() => CreateCategoryInput, {nullable:true})
  category?: CreateCategoryInput;
}
