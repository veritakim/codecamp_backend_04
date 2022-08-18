import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entites/user.entity';
import { UsersService } from '../users.service';

class MockUsersRepository {
  mydb = [
    {
      email: 'a@a.com',
      password: '0000',
      name: '짱구',
      age: 5,
    },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrm...], 가짜 Repository는 provider로
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService); // new UsersService(UsersRepository)
    usersRepository = usersModule.get<MockRepository>(getRepositoryToken(User));
  });

  // describe('findOne', () => {
  //   it('유저정보 꺼내오기', () => {
  //     // controller와 같은 방식으로 테스트 하기
  //    usersService.findOne
  //   });
  // });
  describe('creat', () => {
    it('이미 존재하는 이메일인지 검증', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne');
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      try {
        const result = await usersService.create({ ...myData });
        expect(result).toBeNull();
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
      // 몇 번 실행됐는지 물어봄. 1번을 예상한다.
      expect(usersRepositorySpyFindOne).toBeCalledTimes(1);
      // save는 실행되면 안돼용
      expect(usersRepositorySpySave).toBeCalledTimes(0);
    });
    it('회원 등록이 잘됐는지 검증', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne');
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');

      const myData = {
        email: 'b@b.com',
        hashedPassword: '12345',
        name: '겁쟁이주먹밥',
        age: 12,
      };

      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'b@b.com',
        password: '12345',
        name: '겁쟁이주먹밥',
        age: 12,
      });

      expect(usersRepositorySpyFindOne).toBeCalledTimes(1);
      // save를 해야하니까 한 번이 실행되어야 한다.
      expect(usersRepositorySpySave).toBeCalledTimes(1);
    });
  });
});
