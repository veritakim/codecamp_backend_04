import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    // appService = new AppService();
    // appController = new AppController(appService);

    appController = app.get<AppController>(AppController);
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
