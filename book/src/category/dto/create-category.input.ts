import {  Column} from 'typeorm';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {

  @Field()
  @Column()
  name: string;
}
