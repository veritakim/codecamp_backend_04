import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ user, res }) {
    // 토큰 만들어서 response Header에 넣어주는 작업을 해야한다
    // refreshToken 만들기
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    // 개발환경. 연습일때
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    // 배포환경
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`,
    // );
    // res.setHeader('Access-Control-Allow-Origin', 'https://trudru.shop')
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '30s' },
    );
  }
}
``;
