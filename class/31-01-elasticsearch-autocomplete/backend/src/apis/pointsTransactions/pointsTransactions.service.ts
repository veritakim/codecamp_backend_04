import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository } from 'typeorm';
import { User } from '../users/entites/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransctionRepository: Repository<PointTransaction>, //
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly connection: Connection,
  ) // private readonly dataSource: DataSource connection dataSource로 바꿔주기
  {}

  async create({ impUid, amount, user: _user }) {
    // db와 연결
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // =============== transaction 시작 ===============
    await queryRunner.startTransaction('SERIALIZABLE');
    // ===============================================
    try {
      // 1. 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointTransctionRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransctionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // 강제로 에러 발생시키기
      // throw new Error('강제로 에러발생');

      // 2. 유저의 돈 찾아오기
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });

      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });

      // 3. 유저의 돈 업데이트
      /*
      await this.usersRepository.update(
        { id: _user.id },
        { point: user.point + amount },
      );
      */

      const updatedUser = this.usersRepository.create({
        ...user, //
        point: user.point + amount,
      });

      queryRunner.manager.save(updatedUser);

      // ================ commit 성공 확정 ================
      await queryRunner.commitTransaction();
      // ================================================

      // 4. 최종결과 총가격 프엔에 돌려주기
      return pointTransaction;
    } catch (error) {
      // =============== rollback 코드 작성 ===============
      await queryRunner.rollbackTransaction();
      // ================================================
    } finally {
      // =============== 연결해제 코드 작성 ===============
      await queryRunner.release();
      // ================================================
    }
  }
}
