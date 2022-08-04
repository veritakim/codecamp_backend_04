import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entites/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment({ impUid, amount }) {
    const payment = await this.paymentRepository.create({
      impUid,
      amount,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    const paymentResult = await this.paymentRepository.save(payment);
    return paymentResult;
  }
}
