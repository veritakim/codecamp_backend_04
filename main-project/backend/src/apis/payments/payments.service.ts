import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { IamportService } from '../iamport/import.service';
import { Product } from '../products/entities/product.entity';
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entites/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly iamportService: IamportService,
    private readonly connection: Connection,
  ) {}

  async createPayment({ impUid, amount, productId, quantity }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: productId },
        lock: { mode: 'pessimistic_write' },
      });

      if (product.quantity === 0) {
        throw new UnprocessableEntityException('재고소진');
      }

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

      // product에서 quantitiy 빼기
      const updateProduct = this.productRepository.create({
        ...product,
        quantity: product.quantity - quantity,
      });

      const paymentResult = await this.paymentRepository.save(payment);

      await queryRunner.manager.save(updateProduct);

      await queryRunner.commitTransaction();

      return paymentResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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

  async cancelOrder({
    impUid,
    checksum: amount,
    merchantUid,
    productId,
    quantity,
  }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      console.log('ddddd');
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: productId },
        lock: { mode: 'pessimistic_write' },
      });

      console.log('cancelorder', product);

      const updateProduct = this.productRepository.create({
        ...product,
        quantity: product.quantity + quantity,
      });

      const payment = this.paymentRepository.create({
        impUid,
        amount,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
        merchantUid,
      });

      await this.paymentRepository.save(payment);
      await queryRunner.manager.save(updateProduct);

      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
