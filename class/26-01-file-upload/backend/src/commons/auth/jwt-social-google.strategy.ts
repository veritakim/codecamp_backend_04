import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '1068490193785-cblo4rb3iqgn9s10ion2375vnndqdpte.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      hashedPassword: '1234',
      name: profile.displayName,
      age: 0,
    };
  }
}
