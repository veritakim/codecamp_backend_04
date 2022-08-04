import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payments/entites/payment.entity';
import { PaymentsResolver } from '../payments/payments.resolver';
import { PaymentsService } from '../payments/payments.service';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entites/user.entity';
import { ProductOrder } from './entities/productOrder.entity';
import { ProductsOrdersResolver } from './productOrders.resolver';
import { ProductsOrdersService } from './productOrders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductOrder, //
      User,
      Payment,
      Product,
    ]),
  ],
  providers: [
    ProductsOrdersResolver, //
    ProductsOrdersService,
    PaymentsService,
  ],
})
export class ProductOrdersModule {}
