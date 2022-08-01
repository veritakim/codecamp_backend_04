import {
  ConflictException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/type/context';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';

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
    @Context() context: IContext,
  ) {
    const user = await this.usersService.findOne({ email });

    if (!user) throw new ConflictException('없는 사용자 입니다.');
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인하세요.');

    // accessToken 보내기 전에 refreshToken만들어서 프론트엔드 쿠키에 저장해서 보내기
    this.authsService.setRefreshToken({ user, res: context.res });

    return this.authsService.getAccessToken({ user });
  }

  // restore
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    // user는 refreshToken에 있다

    return this.authsService.getAccessToken({ user: context.req.user });
  }
}
