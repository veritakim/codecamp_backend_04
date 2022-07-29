import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10.2);
    console.log('hash', hashedPassword);

    return this.userService.create({ email, hashedPassword, name, age });
  }
}
