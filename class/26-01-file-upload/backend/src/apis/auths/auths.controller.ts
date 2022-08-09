import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auths.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    name: string;
    age: string;
  };
}
@Controller()
export class AuthsController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authsService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인(디비에 되어있는지)
    let user = await this.usersService.findOne({ email: req.user.email });
    // 2. 회원가입
    if (!user) {
      user = await this.usersService.create({ ...req.user });
      // email: req.user.email,
      // hashedPassword: req.user.password,
      // name: req.user.name,
      // age: req.user.age,
    }
    // 3. 로그인(accessToken 만들어서 프론트 주기)
    // getAccessToken은 문제가 있다. google login 화면
    // this.authsService.getAccessToken({ user });
    console.log('확인');
    this.authsService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/class/21-03-login-google/frontend/social-login.html',
    ); //
  }
}
