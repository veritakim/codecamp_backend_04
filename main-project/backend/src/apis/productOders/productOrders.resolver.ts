import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { PaymentsService } from '../payments/payments.service';
import { CreateOrderInput } from './dto/createOders.input';
import { ProductOrder } from './entities/productOrder.entity';
import { ProductsOrdersService } from './productOrders.service';

@Resolver()
export class ProductsOrdersResolver {
  constructor(
    private readonly productsOrderService: ProductsOrdersService, //
    private readonly paymentsService: PaymentsService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductOrder)
  async createItemsOrder(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context: IContext,
  ) {
    const pay = await this.paymentsService.createPayment({ impUid, amount });

    const user = context.req.user.id;
    return this.productsOrderService.createOrder({
      createOrderInput,
      user,
      pay,
    });
  }
}
