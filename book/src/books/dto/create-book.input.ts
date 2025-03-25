import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  author: string;

  @Field()
  createdAt?: string;
}
