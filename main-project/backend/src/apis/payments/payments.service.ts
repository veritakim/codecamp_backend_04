import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/import.service';
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entites/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly iamportService: IamportService,
  ) {}

  async createPayment({ impUid, amount }) {
    const iamportToken = await this.iamportService.getIamportToken();
    const checkToken = await this.iamportService.checkToken({
      impUid,
      iamportToken,
    });

    const isPaid = await this.paymentRepository.findOne({
      where: { impUid: checkToken.imp_uid },
    });

    if (isPaid) {
      throw new ConflictException('이미 결제된 주문입니다.');
    }

    const payment = await this.paymentRepository.create({
      impUid,
      amount,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      merchantUid: checkToken.response.merchant_uid,
    });

    const paymentResult = await this.paymentRepository.save(payment);
    return paymentResult;
  }

  async checkPaymentStatus({ impUid }) {
    const result = await this.paymentRepository.find({
      where: { impUid },
    });

    if (!result[0]) {
      throw new UnprocessableEntityException('유효하지 않은 결제정보입니다.');
    }

    result.map((el) => {
      if (el.status === 'CANCEL') {
        throw new UnprocessableEntityException('이미 취소된 결제입니다.');
      }
    });

    return result;
  }

  async cancelOrder({ impUid, checksum: amount, merchantUid }) {
    const payment = await this.paymentRepository.create({
      impUid,
      amount,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      merchantUid,
    });

    await this.paymentRepository.save(payment);
  }
}
