import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ) {
    return this.userService.create({ email, password, name, age });
  }
}
