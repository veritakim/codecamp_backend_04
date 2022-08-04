import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  cs: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  orderNumber: string;

  @Field(() => String)
  product: string;
}
