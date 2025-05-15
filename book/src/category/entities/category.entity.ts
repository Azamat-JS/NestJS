import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { BookEntity } from 'src/books/entities/book.entity';

@ObjectType()
@Entity()
export class CategoryEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.category)
  books: BookEntity[];
}
