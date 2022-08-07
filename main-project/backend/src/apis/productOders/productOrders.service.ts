import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payments/entites/payment.entity';
import { ProductOrder } from './entities/productOrder.entity';

@Injectable()
export class ProductsOrdersService {
  constructor(
    @InjectRepository(ProductOrder)
    private readonly productOrderRepository: Repository<ProductOrder>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createOrder({ createOrderInput, user, pay }) {
    const random = String(Math.round(Math.random() * 10000)).padEnd(5, '2');

    const orderResult = await this.productOrderRepository.save({
      ...createOrderInput,
      user,
      payment: pay?.id,
      orderNumber: `ORD-${random}`,
    });

    return orderResult;
  }

  async findOrder({ paymentId, user }) {
    const result = await this.productOrderRepository.find({
      where: { payment: { id: paymentId } },
      loadRelationIds: true,
    });

    const orderUserId = result[0].user;

    if (user !== orderUserId) {
      throw new UnprocessableEntityException('유저의 정보가 다릅니다');
    }
  }

  async cancelProductOrder({ paymentId }) {
    const cancelProduct = await this.productOrderRepository.findOne({
      where: { payment: { id: paymentId } },
    });

    const cancelInfo = await this.productOrderRepository.create({
      ...cancelProduct,
      cs: '결제취소',
    });

    await this.productOrderRepository.save(cancelInfo);

    return '결제가 취소되었습니다.';
  }
}
