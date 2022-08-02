import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '30s' },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  async socialLogin({ user }) {
    let isUser = await this.usersService.fetchUser({ email: user.email });

    const randomPhone = '010' + Math.round(Math.random() * 100000000);
    const randomPassword = Math.round(Math.random() * 100000000) + '';
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    if (!isUser) {
      const createUsersInput = {
        ...user,
        phoneNumber: randomPhone,
      };

      isUser = await this.usersService.createUser({
        createUsersInput, //
        hashedPassword,
      });
    }

    return isUser;
  }

  async setSocialLogin({ req, res }) {
    let user = await this.usersService.fetchUser({ email: req.user?.email });

    console.log('setsocial', user);

    const randomPhone = '010' + Math.round(Math.random() * 100000000);
    const randomPassword = Math.round(Math.random() * 100000000) + '';
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    if (!user) {
      const createUsersInput = {
        ...req.user,
        phoneNumber: randomPhone,
      };

      user = await this.usersService.createUser({
        createUsersInput, //
        hashedPassword,
      });
    }

    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/main-project/frontend/login/');
  }
}
