import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { IamportService } from '../iamport/import.service';
import { Payment } from './entites/payment.entity';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(
    private readonly paymentsService: PaymentsService, //
    private readonly iamportService: IamportService,
  ) {}

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => Payment)
  // async createPayment({ impUid, amount }) {
  //   const iamportToken = await this.iamportService.getIamportToken();

  //   return this.paymentsService.createPayment({ impUid, amount });
  // }

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => Payment)
  // async cancelPayment({ impUid, amount }) {
  //   const iamportToken = await this.iamportService.getIamportToken();

  //   return this.paymentsService.createPayment({ impUid, amount });
  // }
}
