import { InputType, OmitType } from '@nestjs/graphql';
import { Payment } from '../entites/payment.entity';

@InputType()
export class PaymentInput extends OmitType(Payment, ['id'], InputType) {}
