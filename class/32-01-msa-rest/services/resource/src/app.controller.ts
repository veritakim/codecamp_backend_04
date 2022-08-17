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
  @MessagePattern({ cmd: 'fechBoard' })
  fetchBoard(data) {
    // 실제 fetchBoard 실행하기
    return '게시글 데이터 보내주기';
  }
}
