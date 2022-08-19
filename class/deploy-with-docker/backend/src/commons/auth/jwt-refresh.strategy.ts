import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    // 암호화 했던 이메일과 서브를 받을 수 있다
    console.log(payload); // {email: c@c.com, sub: quslkdnvwoi29efa}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
