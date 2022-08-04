import { Injectable } from '@nestjs/common';
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
    const orderResult = await this.productOrderRepository.save({
      ...createOrderInput,
      user,
      payment: pay?.id,
    });

    return orderResult;
  }
}
