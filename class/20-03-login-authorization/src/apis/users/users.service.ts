import { Conflict, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async create({ email, hashedPassword: password, name, age }) {
    // 등록된 email인지 검증하기
    const user = await this.usersRepository.findOne({ where: { email } });

    // user가 있다면 error
    if (user)
      // throw new Http('이미 등록된 email입니다.', HttpStatus.CONFLICT);
      throw new Conflict('이미 등록된 이메일입니다.');

    const result = await this.usersRepository.save({
      email,
      password,
      name,
      age,
    });

    return result;
  }
}
