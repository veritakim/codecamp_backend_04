import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UsersService, //
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.userService.fetchUser({ email });

    if (!user) throw new UnprocessableEntityException('이메일을 확인하세요.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인하세요');

    this.authService.setRefreshToken({ user, res: context.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authService.getAccessToken({ user: context.req.user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(
    @Context() context: IContext, //
  ) {
    // redis
    let accessToken = '';
    let refreshToken = '';
    for (const key in context.req.headers) {
      if (key === 'authorization') {
        accessToken = context.req.headers[key].split(' ')[1];
      }
      if (key === 'cookie') {
        refreshToken = context.req.headers[key].split('=')[1];
      }
    }
    console.log(context.req.headers['authorization']);
    try {
      const isAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      const isRefreshToken = jwt.verify(refreshToken, 'myRefreshKey');

      await this.cacheManager.set(`accessToken:${accessToken}`, accessToken, {
        ttl: isAccessToken['exp'],
      });
      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        refreshToken,
        {
          ttl: isRefreshToken['exp'],
        },
      );

      return '로그아웃에 성공했습니다.';
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException();
    }
  }
}
