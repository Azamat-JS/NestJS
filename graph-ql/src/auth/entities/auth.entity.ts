import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType() 
@Entity({ name: 'users' })
export class User {
  @Field() 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field() 
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column() 
  password: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column({nullable:true})
  verify_code?:string;

  @Field()
  @Column({ nullable: true })
  resetToken?: string;

  @Field()
  @Column({ nullable: true })
  resetTokenExpiry?: Date;
}
