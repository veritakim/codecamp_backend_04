import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password, name, age }) {
    // 등록된 email인지 검증하기
    const user = await this.userRepository.findOne({ where: { email } });

    // user가 있다면 error
    if (user)
      // throw new HttpException('이미 등록된 email입니다.', HttpStatus.CONFLICT);
      throw new ConflictException('이미 등록된 이메일입니다.');

    const result = await this.userRepository.save({
      email,
      password,
      name,
      age,
    });

    return result;
  }
}
