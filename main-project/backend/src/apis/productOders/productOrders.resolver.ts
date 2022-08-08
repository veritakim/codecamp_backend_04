import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { PaymentsService } from '../payments/payments.service';
import { CreateOrderInput } from './dto/createOders.input';
import { ProductOrder } from './entities/productOrder.entity';
import { ProductsOrdersService } from './productOrders.service';
import { IamportService } from '../iamport/import.service';
import { Connection } from 'typeorm';

@Resolver()
export class ProductsOrdersResolver {
  constructor(
    private readonly productsOrderService: ProductsOrdersService, //
    private readonly paymentsService: PaymentsService,
    private readonly iamportService: IamportService,
    private readonly connection: Connection,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductOrder)
  async createPayment(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context: IContext,
  ) {
    const productId = createOrderInput.product;
    const quantity = createOrderInput.quantity;
    const user = context.req.user.id;
    const pay = await this.paymentsService.createPayment({
      impUid,
      amount,
      productId,
      quantity,
    });

    const order = await this.productsOrderService.createOrder({
      createOrderInput,
      user,
      pay,
    });

    return order;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async cancelPaymentOrder(
    @Args('impUid') impUid: string, //
    @Args('reason') reason: string,
    @Args('productId') productId: string,
    @Args('checksum') checksum: number,
    @Args('quantity') quantity: number,
    @Context() context: IContext,
  ) {
    const checkPaymentStatus = await this.paymentsService.checkPaymentStatus({
      impUid,
    });
    const user = context.req.user.id;

    const paymentId = checkPaymentStatus[0].id;
    const { amount, merchantUid } = checkPaymentStatus[0];

    // 취소하는 유저와 주문 유저 맞는지 검증
    await this.productsOrderService.findOrder({
      paymentId,
      user,
    });

    if (checksum !== amount) {
      throw new UnprocessableEntityException('환불 가능한 금액과 다릅니다.');
    }

    const iamportToken = await this.iamportService.getIamportToken();

    await this.iamportService.cancelPay({
      iamportToken,
      reason,
      impUid,
      amount,
      checksum,
    });

    // payment 테이블 cancel추가
    await this.paymentsService.cancelOrder({
      impUid,
      checksum,
      merchantUid,
      productId,
      quantity,
    });

    // productOrder 테이블 cancel 추가
    return await this.productsOrderService.cancelProductOrder({ paymentId });
  }
}
