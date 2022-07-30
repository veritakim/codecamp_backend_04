import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entites/user.entity';
import { CreateUsersInput } from './createUsers.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUsersInput) {
  @Field(() => String)
  newPassword: string;
}
