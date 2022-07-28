import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entites/user.entity';

@InputType()
export class CreateUsersInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phoneNumber: string;
}
