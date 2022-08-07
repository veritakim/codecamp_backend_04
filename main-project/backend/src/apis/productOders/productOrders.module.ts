import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/import.service';
import { Payment } from '../payments/entites/payment.entity';
import { PaymentsService } from '../payments/payments.service';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entites/user.entity';
import { ProductOrder } from './entities/productOrder.entity';
import { ProductsOrdersResolver } from './productOrders.resolver';
import { ProductsOrdersService } from './productOrders.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      ProductOrder, //
      User,
      Payment,
      Product,
    ]),
    HttpModule,
  ],
  providers: [
    ProductsOrdersResolver, //
    ProductsOrdersService,
    PaymentsService,
    IamportService,
  ],
})
export class ProductOrdersModule {}
