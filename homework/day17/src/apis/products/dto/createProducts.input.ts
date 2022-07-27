import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String, { nullable: true })
  expDate: Date;

  @Field(() => String)
  subCategortId: string;

  @Field(() => String, { nullable: true })
  description: string;
}
