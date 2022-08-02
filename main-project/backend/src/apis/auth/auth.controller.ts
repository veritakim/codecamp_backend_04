import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    name: string;
    age: string;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    console.log('dddd', req.user.email);
    let user = await this.usersService.fetchUser({ email: req.user.email });

    if (!user) {
      const createUsersInput = {
        ...req.user,
        phoneNumber: '01012341234',
      };
      // console.log('ddd', createUsersInput);
      user = await this.usersService.createUser({
        createUsersInput,
        hashedPassword: '12345',
      });
    }

    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakaos(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    /*
    let user = await this.usersService.fetchUser({ email: req.user.email });

    if (!user) {
      const createUsersInput = {
        ...req.user,
        phoneNumber: '01012341234',
      };
      // console.log('ddd', createUsersInput);
      user = await this.usersService.createUser({
        createUsersInput,
        hashedPassword: '12345',
      });
    }
    */

    const user = await this.authService.setSocialLogin({
      user: req.user,
    });

    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/main-project/frontend/login/');
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    /*
    let user = await this.usersService.fetchUser({ email: req.user.email });

    if (!user) {
      const createUsersInput = {
        ...req.user,
        phoneNumber: '01012341234',
      };
      // console.log('ddd', createUsersInput);
      user = await this.usersService.createUser({
        createUsersInput,
        hashedPassword: '12345',
      });
    }
    */

    const user = await this.authService.setSocialLogin({
      user: req.user,
    });

    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/main-project/frontend/login/');
  }
}
