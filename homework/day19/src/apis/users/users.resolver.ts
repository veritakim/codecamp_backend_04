import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUsersInput } from './dto/createUsers.input';
import { UpdateUserInput } from './dto/updateUsers.input';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUsersInput') createUsersInput: CreateUsersInput, //
  ) {
    return this.usersService.createUser({ createUsersInput });
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput, //
  ) {
    return this.usersService.updateUser({ updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    return this.usersService.deleteUser({ email, password });
  }

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.fetchUsers();
  }

  @Query(() => User)
  fetchUser(
    @Args('email') email: string, //
  ) {
    return this.usersService.fetchUser({ email });
  }
}
