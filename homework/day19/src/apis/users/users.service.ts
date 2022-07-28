import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async createUser({ createUsersInput }) {
    const user = await this.usersRepository.findOne({
      where: { email: createUsersInput.email },
    });

    if (user) throw new ConflictException('이미 가입된 계정입니다.');

    const userResult = await this.usersRepository.save({
      ...createUsersInput,
    });

    return userResult;
  }

  async updateUser({ updateUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { email: updateUserInput.email },
    });

    const { newPassword, ...userUpdateInput } = updateUserInput;

    if (user.password !== updateUserInput.password)
      throw new UnprocessableEntityException('비밀번호가 틀립니다.');

    const result = await this.usersRepository.save({
      ...user,
      ...userUpdateInput,
      password: newPassword,
    });

    return result;
  }

  async deleteUser({ email, password }) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user.password !== password || !user)
      throw new UnprocessableEntityException('비밀번호가 틀립니다.');

    const result = await this.usersRepository.softDelete({ email });

    return result.affected ? true : false;
  }

  async fetchUsers() {
    return await this.usersRepository.find();
  }

  async fetchUser({ email }) {
    const result = await this.usersRepository.findOne({ where: { email } });
    if (!result) throw new UnprocessableEntityException('없는 사용자입니다.');

    return result;
  }
}
