import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@ObjectType() 
@Entity()
export class BookEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field() 
  @Column()
  title: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field({nullable:true})
  @Column() 
  author: string;

  @Field()
  @CreateDateColumn({type: "timestamp"})
  createdAt: string;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category:CategoryEntity;
}
