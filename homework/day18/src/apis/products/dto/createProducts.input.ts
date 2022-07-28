import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductDescriptionsInput } from 'src/apis/productDescriptions/dto/productDescriptions.input';
import { ProductSubCategoryInput } from 'src/apis/productsSubCategories/dto/productSubCategory.input';
import { ProductSubCategory } from 'src/apis/productsSubCategories/entities/productSubCategory.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String, { nullable: true })
  expDate: Date;

  @Field(() => ProductSubCategoryInput)
  productSubCategory: ProductSubCategoryInput;

  @Field(() => ProductDescriptionsInput)
  description: ProductDescriptionsInput;
}
