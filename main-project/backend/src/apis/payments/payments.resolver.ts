import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { Payment } from './entites/payment.entity';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(
    private readonly paymentsService: PaymentsService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  createPayment({ impUid, amount }) {
    return this.paymentsService.createPayment({ impUid, amount });
  }
}
