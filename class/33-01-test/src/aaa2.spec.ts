import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  // it가 아니고 왜 describe로 했니?
  // 여러가지 변수를 테스트 해야하기 때문에 .
  // 만약 상품을 사는 로직이면 가진 돈 검증, 재고 검증, 상품 구매가 잘 됐는지 검증을 해야하기 때문에
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
    appController.getHello();
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
  // appController.fetchBoards()
  // appController.createBoard()
  // describe('fetchBoards', () => {});

  // describe('createBoard', () => {});
});
