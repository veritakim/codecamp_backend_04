import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly userService: UsersService, //
  ) {}

  @UseGuards(AuthGuard('access'))
  @Query(() => String)
  fetchUser() {
    // 유저정보 꺼내오기
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
