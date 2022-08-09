import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly userService: UsersService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @Context() context: any, //
  ) {
    // 유저정보 꺼내오기
    console.log(context);
    console.log('fetchuser 실행완료');
    return 'fetchUser가 실행됐습니다.';
  }

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
