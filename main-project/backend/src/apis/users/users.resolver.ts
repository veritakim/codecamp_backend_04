import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CreateUsersInput } from './dto/createUsers.input';
import { UpdateUserInput } from './dto/updateUsers.input';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import {
  ConsoleLogger,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ) {
    const email = context.req.user.email;
    return this.usersService.fetchUser({ email });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUsersInput') createUsersInput: CreateUsersInput, //
  ) {
    const hashedPassword = await bcrypt.hash(createUsersInput.password, 10);
    return this.usersService.createUser({ createUsersInput, hashedPassword });
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput, //
  ) {
    return this.usersService.updateUser({ updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUserPwd(
    @Context() context: IContext, //
    @Args('password') password: string,
    @Args('newPassword') newPassword: string,
  ) {
    const email = context.req.user.email;
    const user = await this.usersService.fetchUser({ email });

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인하세요');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.usersService.updateUserPwd({ user, hashedPassword });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    return this.usersService.deleteUser({ email, password });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteLoginUser(
    @Context() context: IContext, //
    @Args('password') password: string,
  ) {
    const email = context.req.user.email;
    const user = await this.usersService.fetchUser({ email });

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인하세요');

    return this.usersService.deleteLoginUser({ email });
  }
}
