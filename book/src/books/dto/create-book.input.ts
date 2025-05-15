import { InputType, Field, Float } from '@nestjs/graphql';
import { CreateCategoryInput } from 'src/category/dto/create-category.input';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true }) 
  author?: string;

  @Field(() => CreateCategoryInput)
  category: CreateCategoryInput;
}
