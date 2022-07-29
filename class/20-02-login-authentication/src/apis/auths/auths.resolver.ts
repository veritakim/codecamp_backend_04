import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auths.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authsService: AuthService,
  ) {}

  // login
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인 - 이메일이 일치하는 유저를 db에서 찾기
    const user = await this.usersService.findOne({ email });

    // 2. 해당유저가 없으면 에러 던져주기
    if (!user) throw new ConflictException('없는 사용자 입니다.');
    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면 ?
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인하세요.');

    // 4. 일치하는 유저가 있고, 비밀번호도 일치하면 ?
    // -> accessToken(JWT) 발급. 브라우져에 전달
    // 브라우저는 알아서 스토리지에 전달한다
    return this.authsService.getAccessToken({ user });
  }
}
