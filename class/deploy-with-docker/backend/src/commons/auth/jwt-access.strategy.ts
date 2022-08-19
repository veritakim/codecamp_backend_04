import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const accessToken = req.headers.Authorization;
      //   const result = accessToken.replace('Bearer ', '');
      //   return result;
      // },

      // 위의 것과 동일한. 함수를 따로 제공해준다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }

  // 실패했을 땐 알아서 프론트로 에러가 간다

  // 성공하면 validate에 데이터 주기
  validate(payload) {
    // 암호화 했던 이메일과 서브를 받을 수 있다
    console.log(payload); // {email: c@c.com, sub: quslkdnvwoi29efa}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
