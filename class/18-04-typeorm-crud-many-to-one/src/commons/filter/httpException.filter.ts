import { Catch, Filter, Http } from '@nestjs/common';

@Catch(Http)
export class HttpFilter implements Filter {
  catch(: Http) {
    const status = .getStatus();
    const message = .message;

    console.log('=====================');
    console.log('예외가 발생했어요!!!');
    console.log('예외 내용', message);
    console.log('예외 코드', status);
    console.log('=====================');
  }
}
