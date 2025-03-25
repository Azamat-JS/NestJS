import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class FilterBookInput {
  @Field({nullable:true})
  title?: string;

  @Field(() => Float, {nullable:true})
  price?: number;

  @Field({nullable:true})
  author?: string;

  @Field({nullable:true})
  createdAt?: string;

  @Field(() => Float, {nullable:true})
  minPrice?:number;

  @Field(() => Float, {nullable:true})
  maxPrice?:number;

  @Field({nullable:true})
  sortBy?: "price" | "author" | "title";

  @Field({nullable:true})
  order?: "ASC" | "DESC";
}
