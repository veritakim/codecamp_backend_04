import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/auth/login')
  login() {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: '로그인 실행해줘' },
      { email: 'a@a.com', password: '12324' },
    );
  }

  @Get('/board')
  fetchBoard() {
    // resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send(
      { cmd: 'fechBoard' },
      { title: '안녕하세요', contents: '반갑습니다.' },
    );
  }
}
