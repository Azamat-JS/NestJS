import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { PurchaseEntity } from 'src/purchase/entities/purchase.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @Field(() => CategoryEntity, {nullable:true})
  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category:CategoryEntity;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  purchased: boolean;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.book)
  purchases: PurchaseEntity[];
}
