import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  cs: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  product: string;
}
