import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/auth.entity';

@ObjectType()
export class RegisterResponse {
  @Field()
  message: string;

  @Field(() => User)
  data: Partial<User>;
}
