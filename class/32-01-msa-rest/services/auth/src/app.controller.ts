import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @MessagePattern({ qqq: '로그인 실행해줘' })
  login(data) {
    // 실제 로그인 하기
    console.log('==============');
    console.log(data);
    console.log('==============');

    return '로그인 성공';
  }
}
