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
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  async setSocialLogin({ req, res }) {
    let user = await this.usersService.fetchUser({ email: req.user?.email });

    const randomPhone = String(Math.round(Math.random() * 100000000));
    const randomPassword = Math.round(Math.random() * 100000000) + '';
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    if (!user) {
      const createUsersInput = {
        ...req.user,
        phoneNumber: '010' + randomPhone.padEnd(8, '2'),
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
