import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { BookEntity } from 'src/books/entities/book.entity';

@ObjectType()
@Entity()
export class PurchaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => BookEntity)
  @ManyToOne(() => BookEntity, (book) => book.purchases)
  book: BookEntity;

  @Field()
  @Column()
  userId: string; 

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  formalized: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  purchaseDate: string;
}
